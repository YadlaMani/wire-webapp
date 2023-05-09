/*
 * Wire
 * Copyright (C) 2022 Wire Swiss GmbH
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

import React, {useMemo, useState, useEffect} from 'react';

import {QualifiedId} from '@wireapp/api-client/lib/user';

import {Conversation} from 'src/script/entity/Conversation';
import {CompositeMessage} from 'src/script/entity/message/CompositeMessage';
import {ContentMessage} from 'src/script/entity/message/ContentMessage';
import {Message} from 'src/script/entity/message/Message';
import {useRelativeTimestamp} from 'src/script/hooks/useRelativeTimestamp';
import {StatusType} from 'src/script/message/StatusType';
import {useKoSubscribableChildren} from 'Util/ComponentUtil';
import {getMessageAriaLabel} from 'Util/conversationMessages';

import {ContentAsset} from './asset';
import {MessageActionsMenu} from './MessageActions/MessageActions';
import {MessageReactionsList} from './MessageActions/MessageReactions/MessageReactionsList';
import {MessageHeader} from './MessageHeader';
import {Quote} from './MessageQuote';
import {CompleteFailureToSendWarning, PartialFailureToSendWarning} from './Warnings';

import {MessageActions} from '..';
import {EphemeralStatusType} from '../../../../message/EphemeralStatusType';
import {ContextMenuEntry} from '../../../../ui/ContextMenu';
import {EphemeralTimer} from '../EphemeralTimer';
import {MessageTime} from '../MessageTime';
import {ReadReceiptStatus} from '../ReadReceiptStatus';
import {useMessageFocusedTabIndex} from '../util';

export interface ContentMessageProps extends Omit<MessageActions, 'onClickResetSession'> {
  contextMenu: {entries: ko.Subscribable<ContextMenuEntry[]>};
  conversation: Conversation;
  findMessage: (conversation: Conversation, messageId: string) => Promise<ContentMessage | undefined>;
  focusMessage?: () => void;
  hasMarker?: boolean;
  isMessageFocused: boolean;
  isLastDeliveredMessage: boolean;
  message: ContentMessage;
  onClickButton: (message: CompositeMessage, buttonId: string) => void;
  onRetry: (message: ContentMessage) => void;
  previousMessage?: Message;
  quotedMessage?: ContentMessage;
  selfId: QualifiedId;
  isMsgElementsFocusable: boolean;
  onClickReaction: (emoji: string) => void;
}

const ContentMessageComponent: React.FC<ContentMessageProps> = ({
  conversation,
  message,
  findMessage,
  selfId,
  hasMarker = false,
  isMessageFocused,
  isLastDeliveredMessage,
  contextMenu,
  previousMessage,
  onClickAvatar,
  onClickImage,
  onClickTimestamp,
  onClickMessage,
  onClickReactionDetails,
  onClickButton,
  onRetry,
  isMsgElementsFocusable,
  onClickReaction,
}) => {
  // check if current message is focused and its elements focusable
  const msgFocusState = useMemo(
    () => isMsgElementsFocusable && isMessageFocused,
    [isMsgElementsFocusable, isMessageFocused],
  );
  const messageFocusedTabIndex = useMessageFocusedTabIndex(msgFocusState);
  const {
    senderName,
    timestamp,
    ephemeral_caption,
    ephemeral_status,
    assets,
    was_edited,
    failedToSend,
    reactions,
    status,
    user,
  } = useKoSubscribableChildren(message, [
    'senderName',
    'timestamp',
    'ephemeral_caption',
    'ephemeral_status',
    'assets',
    'other_likes',
    'was_edited',
    'failedToSend',
    'reactions',
    'status',
    'user',
  ]);

  const shouldShowAvatar = (): boolean => {
    if (!previousMessage || hasMarker) {
      return true;
    }

    if (message.isContent() && was_edited) {
      return true;
    }

    return !previousMessage.isContent() || previousMessage.user().id !== user.id;
  };
  const timeAgo = useRelativeTimestamp(message.timestamp());
  const [messageAriaLabel] = getMessageAriaLabel({
    assets,
    displayTimestampShort: message.displayTimestampShort(),
    senderName,
  });

  const [isActionMenuVisible, setActionMenuVisibility] = useState(true);

  useEffect(() => {
    if (isMessageFocused || msgFocusState) {
      setActionMenuVisibility(true);
    } else {
      setActionMenuVisibility(false);
    }
  }, [msgFocusState, isMessageFocused]);

  return (
    <div aria-label={messageAriaLabel}>
      {shouldShowAvatar() && (
        <MessageHeader onClickAvatar={onClickAvatar} message={message} focusTabIndex={messageFocusedTabIndex}>
          {was_edited && (
            <span className="message-header-label-icon icon-edit" title={message.displayEditedTimestamp()}></span>
          )}
          <span className="content-message-timestamp">
            <MessageTime timestamp={timestamp} className="label-xs" data-timestamp-type="normal">
              {timeAgo}
            </MessageTime>
          </span>
        </MessageHeader>
      )}
      {message.quote() && (
        <Quote
          conversation={conversation}
          quote={message.quote()}
          selfId={selfId}
          findMessage={findMessage}
          showDetail={onClickImage}
          focusMessage={onClickTimestamp}
          handleClickOnMessage={onClickMessage}
          showUserDetails={onClickAvatar}
          isMessageFocused={msgFocusState}
        />
      )}
      <div className="message-body" title={ephemeral_caption}>
        {ephemeral_status === EphemeralStatusType.ACTIVE && (
          <div className="message-ephemeral-timer">
            <EphemeralTimer message={message} />
          </div>
        )}
        {assets.map(asset => (
          <ContentAsset
            key={asset.type}
            asset={asset}
            message={message}
            selfId={selfId}
            onClickButton={onClickButton}
            onClickImage={onClickImage}
            onClickMessage={onClickMessage}
            isMessageFocused={msgFocusState}
          />
        ))}
        {failedToSend && (
          <PartialFailureToSendWarning failedToSend={failedToSend} knownUsers={conversation.allUserEntities()} />
        )}
        {status === StatusType.FAILED && (
          <CompleteFailureToSendWarning
            isTextAsset={message.getFirstAsset().isText()}
            onRetry={() => onRetry(message)}
          />
        )}
        <div className="message-body-actions">
          <ReadReceiptStatus
            message={message}
            is1to1Conversation={conversation.is1to1()}
            isLastDeliveredMessage={isLastDeliveredMessage}
          />
        </div>
        {isActionMenuVisible && (
          <MessageActionsMenu
            isMsgWithHeader={shouldShowAvatar()}
            message={message}
            handleActionMenuVisibility={setActionMenuVisibility}
            contextMenu={contextMenu}
            isMessageFocused={msgFocusState}
            messageWithSection={hasMarker}
            handleReactionClick={onClickReaction}
          />
        )}
      </div>

      <MessageReactionsList
        reactions={reactions}
        handleReactionClick={onClickReaction}
        isMessageFocused={msgFocusState}
        onTooltipReactionCountClick={() => onClickReactionDetails(message)}
      />
    </div>
  );
};

export {ContentMessageComponent};
