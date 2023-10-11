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

export type Emoticon = {
  name: string;
  emoji: string;
  tags: string[];
  description: string;
  emoticons: string[];
};

/**
 * List of all the emojis we live replace while typing
 */
export const inlineReplacements: Emoticon[] = [
  {
    name: 'angry',
    emoji: '😠',
    tags: ['mad', 'annoyed'],
    description: 'angry face',
    emoticons: ['>:(', '>:[', '>:-(', '>:-[', '>=(', '>=[', '>=-(', '>=-['],
  },
  {
    name: 'blush',
    emoji: '😊',
    tags: ['proud'],
    description: 'smiling face with smiling eyes',
    emoticons: [':")', ':"]', ':"D', ':-")', ':-"]', ':-"D', '=")', '="]', '="D', '=-")', '=-"]', '=-"D'],
  },
  {
    name: 'broken_heart',
    emoji: '💔',
    tags: [],
    description: 'broken heart',
    emoticons: ['<\\3', '</3'],
  },
  {
    name: 'confused',
    emoji: '😕',
    tags: [],
    description: 'confused face',
    emoticons: [':/', ':\\', ':-/', ':-\\', '=/', '=\\', '=-/', '=-\\'],
  },
  {
    name: 'cry',
    emoji: '😢',
    tags: ['sad', 'tear'],
    description: 'crying face',
    emoticons: [
      ':,(',
      ':,[',
      ':,|',
      ':,-(',
      ':,-[',
      ':,-|',
      ":'(",
      ":'[",
      ":'|",
      ":'-(",
      ":'-[",
      ":'-|",
      '=,(',
      '=,[',
      '=,|',
      '=,-(',
      '=,-[',
      '=,-|',
      "='(",
      "='[",
      "='|",
      "='-(",
      "='-[",
      "='-|",
    ],
  },
  {
    name: 'frowning',
    emoji: '😦',
    tags: [],
    description: 'frowning face with open mouth',
    emoticons: [':(', ':[', ':-(', ':-[', '=(', '=[', '=-(', '=-['],
  },
  {
    name: 'heart',
    emoji: '❤️',
    tags: ['love'],
    description: 'red heart',
    emoticons: ['<3'],
  },
  {
    name: 'imp',
    emoji: '👿',
    tags: ['angry', 'devil', 'evil', 'horns'],
    description: 'angry face with horns',
    emoticons: [']:(', ']:[', ']:-(', ']:-[', ']=(', ']=[', ']=-(', ']=-['],
  },
  {
    name: 'innocent',
    emoji: '😇',
    tags: ['angel'],
    description: 'smiling face with halo',
    emoticons: [
      'o:)',
      'o:]',
      'o:D',
      'o:-)',
      'o:-]',
      'o:-D',
      'o=)',
      'o=]',
      'o=D',
      'o=-)',
      'o=-]',
      'o=-D',
      'O:)',
      'O:]',
      'O:D',
      'O:-)',
      'O:-]',
      'O:-D',
      'O=)',
      'O=]',
      'O=D',
      'O=-)',
      'O=-]',
      'O=-D',
      '0:)',
      '0:]',
      '0:D',
      '0:-)',
      '0:-]',
      '0:-D',
      '0=)',
      '0=]',
      '0=D',
      '0=-)',
      '0=-]',
      '0=-D',
    ],
  },
  {
    name: 'joy',
    emoji: '😂',
    tags: ['tears'],
    description: 'face with tears of joy',
    emoticons: [
      ':,)',
      ':,]',
      ':,D',
      ':,-)',
      ':,-]',
      ':,-D',
      ":')",
      ":']",
      ":'D",
      ":'-)",
      ":'-]",
      ":'-D",
      '=,)',
      '=,]',
      '=,D',
      '=,-)',
      '=,-]',
      '=,-D',
      "=')",
      "=']",
      "='D",
      "='-)",
      "='-]",
      "='-D",
    ],
  },
  {
    name: 'kissing',
    emoji: '😗',
    tags: [],
    description: 'kissing face',
    emoticons: [':*', ':-*', '=*', '=-*'],
  },
  {
    name: 'laughing',
    emoji: '😆',
    tags: ['happy', 'haha'],
    description: 'grinning squinting face',
    emoticons: ['x)', 'x]', 'xD', 'x-)', 'x-]', 'x-D', 'X)', 'X]', 'X-)', 'X-]', 'X-D'],
  },
  {
    name: 'man',
    emoji: '👨',
    tags: ['mustache', 'father', 'dad'],
    description: 'man',
    emoticons: [':3', ':-3', '=3', '=-3', ';3', ';-3', 'x3', 'x-3', 'X3', 'X-3'],
  },
  {
    name: 'neutral_face',
    emoji: '😐',
    tags: ['meh'],
    description: 'neutral face',
    emoticons: [':|', ':-|', '=|', '=-|'],
  },
  {
    name: 'no_mouth',
    emoji: '😶',
    tags: ['mute', 'silence'],
    description: 'face without mouth',
    emoticons: [':-'],
  },
  {
    name: 'open_mouth',
    emoji: '😮',
    tags: ['surprise', 'impressed', 'wow'],
    description: 'face with open mouth',
    emoticons: [':o', ':O', ':0', ':-o', ':-O', ':-0', '=o', '=O', '=0', '=-o', '=-O', '=-0'],
  },
  {
    name: 'rage',
    emoji: '😡',
    tags: ['angry'],
    description: 'pouting face',
    emoticons: [':@', ':-@', '=@', '=-@'],
  },
  {
    name: 'smile',
    emoji: '😄',
    tags: ['happy', 'joy', 'laugh', 'pleased'],
    description: 'grinning face with smiling eyes',
    emoticons: [':D', ':-D', '=D', '=-D'],
  },
  {
    name: 'slight smile',
    emoji: '🙂',
    tags: ['face', 'slightly smiling face', 'smile'],
    description: 'slightly smiling face',
    emoticons: [':)', ':]', ':-)', ':-]', '=)', '=]', '=-)', '=-]'],
  },
  {
    name: 'smiling_imp',
    emoji: '😈',
    tags: ['devil', 'evil', 'horns'],
    description: 'smiling face with horns',
    emoticons: [']:)', ']:]', ']:D', ']:-)', ']:-]', ']:-D', ']=)', ']=]', ']=D', ']=-)', ']=-]', ']=-D'],
  },
  {
    name: 'sob',
    emoji: '😭',
    tags: ['sad', 'cry', 'bawling'],
    description: 'loudly crying face',
    emoticons: [
      ":,'(",
      ":,'[",
      ":,'-(",
      ":,'-[",
      ":',(",
      ":',[",
      ":',-(",
      ":',-[",
      "=,'(",
      "=,'[",
      "=,'-(",
      "=,'-[",
      "=',(",
      "=',[",
      "=',-(",
      "=',-[",
    ],
  },
  {
    name: 'stuck_out_tongue',
    emoji: '😛',
    tags: [],
    description: 'face with tongue',
    emoticons: [':p', ':P', ':d', ':-p', ':-P', ':-d', '=p', '=P', '=d', '=-p', '=-P', '=-d'],
  },
  {
    name: 'stuck_out_tongue_closed_eyes',
    emoji: '😝',
    tags: ['prank'],
    description: 'squinting face with tongue',
    emoticons: ['xP', 'x-p', 'x-P', 'x-d', 'Xp', 'Xd', 'X-p', 'X-P', 'X-d'],
  },
  {
    name: 'stuck_out_tongue_winking_eye',
    emoji: '😜',
    tags: ['prank', 'silly'],
    description: 'winking face with tongue',
    emoticons: [';p', ';P', ';d', ';-p', ';-P', ';-d'],
  },
  {
    name: 'sunglasses',
    emoji: '😎',
    tags: ['cool'],
    description: 'smiling face with sunglasses',
    emoticons: ['8)', '8]', '8D', '8-)', '8-]', '8-D', 'B)', 'B]', 'B-)', 'B-]', 'B-D'],
  },
  {
    name: 'sweat',
    emoji: '😓',
    tags: [],
    description: 'downcast face with sweat',
    emoticons: [
      ',:(',
      ',:[',
      ',:-(',
      ',:-[',
      ',=(',
      ',=[',
      ',=-(',
      ',=-[',
      "':(",
      "':[",
      "':-(",
      "':-[",
      "'=(",
      "'=[",
      "'=-(",
      "'=-[",
    ],
  },
  {
    name: 'sweat_smile',
    emoji: '😅',
    tags: ['hot'],
    description: 'grinning face with sweat',
    emoticons: [
      ',:)',
      ',:]',
      ',:D',
      ',:-)',
      ',:-]',
      ',:-D',
      ',=)',
      ',=]',
      ',=D',
      ',=-)',
      ',=-]',
      ',=-D',
      "':)",
      "':]",
      "':D",
      "':-)",
      "':-]",
      "':-D",
      "'=)",
      "'=]",
      "'=D",
      "'=-)",
      "'=-]",
      "'=-D",
    ],
  },
  {
    name: 'unamused',
    emoji: '😒',
    tags: ['meh'],
    description: 'unamused face',
    emoticons: [
      ':$',
      ':s',
      ':z',
      ':S',
      ':Z',
      ':-$',
      ':-s',
      ':-z',
      ':-S',
      ':-Z',
      '=$',
      '=s',
      '=z',
      '=S',
      '=Z',
      '=-$',
      '=-s',
      '=-z',
      '=-S',
      '=-Z',
    ],
  },
  {
    name: 'wink',
    emoji: '😉',
    tags: ['flirt'],
    description: 'winking face',
    emoticons: [';)', ';]', ';D', ';-)', ';-]', ';-D'],
  },
];
