/**
 * @license
 * Copyright Google LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// THIS CODE IS GENERATED - DO NOT MODIFY
// See angular/tools/gulp-tasks/cldr/extract.js

const u = undefined;

function plural(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export default [
  'ne', [['पूर्वाह्न', 'अपराह्न'], u, u], u,
  [
    ['आ', 'सो', 'म', 'बु', 'बि', 'शु', 'श'],
    [
      'आइत', 'सोम', 'मङ्गल', 'बुध', 'बिहि', 'शुक्र',
      'शनि'
    ],
    [
      'आइतबार', 'सोमबार', 'मङ्गलबार', 'बुधबार',
      'बिहिबार', 'शुक्रबार', 'शनिबार'
    ],
    [
      'आइत', 'सोम', 'मङ्गल', 'बुध', 'बिहि', 'शुक्र',
      'शनि'
    ]
  ],
  u,
  [
    [
      'जन', 'फेब', 'मार्च', 'अप्र', 'मे', 'जुन', 'जुल',
      'अग', 'सेप', 'अक्टो', 'नोभे', 'डिसे'
    ],
    [
      'जनवरी', 'फेब्रुअरी', 'मार्च', 'अप्रिल',
      'मे', 'जुन', 'जुलाई', 'अगस्ट', 'सेप्टेम्बर',
      'अक्टोबर', 'नोभेम्बर', 'डिसेम्बर'
    ],
    u
  ],
  [
    [
      'जन', 'फेेब', 'मार्च', 'अप्र', 'मे', 'जुन',
      'जुल', 'अग', 'सेप', 'अक्टो', 'नोभे', 'डिसे'
    ],
    [
      'जनवरी', 'फेब्रुअरी', 'मार्च', 'अप्रिल',
      'मे', 'जुन', 'जुलाई', 'अगस्ट', 'सेप्टेम्बर',
      'अक्टोबर', 'नोभेम्बर', 'डिसेम्बर'
    ],
    u
  ],
  [['ईसा पूर्व', 'सन्'], u, u], 0, [6, 0],
  ['yy/M/d', 'y MMM d', 'y MMMM d', 'y MMMM d, EEEE'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'], ['{1}, {0}', u, '{1} {0}', u],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤ #,##0.00', '#E0'], 'नेरू',
  'नेपाली रूपैयाँ',
  {'JPY': ['JP¥', '¥'], 'NPR': ['नेरू', 'रू'], 'THB': ['฿'], 'USD': ['US$', '$']},
  plural
];
