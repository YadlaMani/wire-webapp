/*
 * Wire
 * Copyright (C) 2023 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

import {ConversationProtocol} from '@wireapp/api-client/lib/conversation';
import {QualifiedId} from '@wireapp/api-client/lib/user';

import {Account} from '@wireapp/core';

import {ConversationRepository} from 'src/script/conversation/ConversationRepository';
import {
  ProteusConversation,
  isMixedConversation,
  isProteusConversation,
} from 'src/script/conversation/ConversationSelectors';
import {Conversation} from 'src/script/entity/Conversation';

import {addMixedConversationMembersToMLSGroup} from './addMixedConversationMembersToMLSGroup';
import {tryEstablishingMLSGroupForMixedConversation} from './tryEstablishingMLSGroupForMixedConversation';

import {mlsMigrationLogger} from '../MLSMigrationLogger';

interface InitialiseMigrationOfProteusConversationParams {
  core: Account;
  conversationRepository: ConversationRepository;
  selfUserId: QualifiedId;
}

/**
 * Will initialise MLS migration for provided proteus conversations.
 *
 * @param proteusConversations - proteus conversations to initialise MLS migration for
 * @param core - instance of core
 * @param conversationRepository - conversation repository
 * @param selfUserId - id of the current (self) user
 */
export const initialiseMigrationOfProteusConversations = async (
  conversations: Conversation[],
  {core, conversationRepository, selfUserId}: InitialiseMigrationOfProteusConversationParams,
) => {
  const proteusConversations = conversations.filter(isProteusConversation);
  if (proteusConversations.length < 1) {
    return;
  }

  mlsMigrationLogger.info(`Initialising MLS migration for ${proteusConversations.length} "proteus" conversations`);
  for (const proteusConversation of proteusConversations) {
    await initialiseMigrationOfProteusConversation(proteusConversation, {
      core,
      conversationRepository,
      selfUserId,
    });
  }
};

const initialiseMigrationOfProteusConversation = async (
  proteusConversation: ProteusConversation,
  {core, conversationRepository, selfUserId}: InitialiseMigrationOfProteusConversationParams,
) => {
  mlsMigrationLogger.info(
    `Initialising MLS migration for "proteus" conversation: ${proteusConversation.qualifiedId.id}`,
  );

  try {
    //update conversation protocol on both backend and local store
    const updatedMixedConversation = await conversationRepository.updateConversationProtocol(
      proteusConversation,
      ConversationProtocol.MIXED,
    );

    //we have to make sure that conversation's protocol has really changed to mixed and it contains groupId
    if (!isMixedConversation(updatedMixedConversation)) {
      throw new Error(`Conversation ${updatedMixedConversation.qualifiedId.id} was not updated to mixed protocol.`);
    }

    mlsMigrationLogger.info(
      `Conversation ${updatedMixedConversation.qualifiedId.id} was updated to mixed protocol successfully, trying to initialise MLS Group...`,
    );

    const hasEstablishedMLSGroup = await tryEstablishingMLSGroupForMixedConversation(updatedMixedConversation, {
      core,
      selfUserId,
    });

    if (!hasEstablishedMLSGroup) {
      //we don't want to add members to the group if we have not established it
      //only client who established the group should add members to it
      return;
    }

    mlsMigrationLogger.info(
      `MLS Group for conversation ${updatedMixedConversation.qualifiedId.id} was initialised successfully, adding other users...`,
    );

    await addMixedConversationMembersToMLSGroup(updatedMixedConversation, {core, selfUserId});
  } catch (error) {
    mlsMigrationLogger.error(
      `Error while initialising MLS migration for "proteus" conversation: ${proteusConversation.qualifiedId.id}`,
      error,
    );
  }
};
