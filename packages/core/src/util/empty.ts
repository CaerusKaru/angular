/**
* @license
* Copyright Google LLC. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
import './ng_dev_mode';

/**
 * This file contains reuseable "empty" symbols that can be used as default return values
 * in different parts of the rendering code. Because the same symbols are returned, this
 * allows for identity checks against these values to be consistently used by the framework
 * code.
 */

export const EMPTY_OBJ: {} = {};
export const EMPTY_ARRAY: any[] = [];

// freezing the values prevents any code from accidentally inserting new values in
if (typeof ngDevMode !== 'undefined' && ngDevMode) {
  Object.freeze(EMPTY_OBJ);
  Object.freeze(EMPTY_ARRAY);
}
