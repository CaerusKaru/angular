/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ɵAnimationEngine} from '@angular/animations/browser';
import {PlatformLocation, ViewportScroller, ɵNullViewportScroller as NullViewportScroller, ɵPLATFORM_SERVER_ID as PLATFORM_SERVER_ID} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Injectable, InjectionToken, Injector, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, PlatformRef, Provider, RendererFactory2, RootRenderer, StaticProvider, Testability, createPlatformFactory, isDevMode, platformCore, ɵALLOW_MULTIPLE_PLATFORMS as ALLOW_MULTIPLE_PLATFORMS} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule, DOCUMENT, EVENT_MANAGER_PLUGINS, ɵSharedStylesHost as SharedStylesHost, ɵTRANSITION_ID, ɵgetDOM as getDOM} from '@angular/platform-browser';
import {ɵplatformCoreDynamic as platformCoreDynamic} from '@angular/platform-browser-dynamic';
import {NoopAnimationsModule, ɵAnimationRendererFactory} from '@angular/platform-browser/animations';

import {DominoAdapter, parseDocument as parseDocumentDomino} from './domino_adapter';
import {SERVER_HTTP_PROVIDERS} from './http';
import {JsdomAdapter, parseDocument as parseDocumentJsdom} from './jsdom_adapter';
import {ServerPlatformLocation} from './location';
import {PlatformState} from './platform_state';
import {ServerEventManagerPlugin} from './server_events';
import {ServerRendererFactory2} from './server_renderer';
import {ServerStylesHost} from './styles_host';
import {INITIAL_CONFIG, PlatformConfig} from './tokens';

function notSupported(feature: string): Error {
  throw new Error(`platform-server does not support '${feature}'.`);
}

export enum ServerDom {
  Domino,
  JSDOM,
}

export const SERVER_DOM = new InjectionToken<ServerDom>(
    'Type of renderer to use for SSR', {providedIn: 'root', factory: () => ServerDom.Domino});

export const INTERNAL_SERVER_PLATFORM_PROVIDERS: StaticProvider[] = [
  {provide: DOCUMENT, useFactory: _document, deps: [Injector, SERVER_DOM]},
  {provide: PLATFORM_ID, useValue: PLATFORM_SERVER_ID},
  {provide: PLATFORM_INITIALIZER, useFactory: initDomAdapter, multi: true, deps: [SERVER_DOM]}, {
    provide: PlatformLocation,
    useClass: ServerPlatformLocation,
    deps: [DOCUMENT, [Optional, INITIAL_CONFIG]]
  },
  {provide: PlatformState, deps: [DOCUMENT]},
  // Add special provider that allows multiple instances of platformServer* to be created.
  {provide: ALLOW_MULTIPLE_PLATFORMS, useValue: true}
];

function initDomAdapter(serverDom: ServerDom) {
  switch (serverDom) {
    case ServerDom.Domino:
      return initDominoAdapter;
    case ServerDom.JSDOM:
      return initJsdomAdapter;
    default:
      return initDominoAdapter;
  }
}

function initDominoAdapter() {
  return () => { DominoAdapter.makeCurrent(); };
}

function initJsdomAdapter() {
  return () => { JsdomAdapter.makeCurrent(); };
}

export function instantiateServerRendererFactory(
    renderer: RendererFactory2, engine: ɵAnimationEngine, zone: NgZone) {
  return new ɵAnimationRendererFactory(renderer, engine, zone);
}

export const SERVER_RENDER_PROVIDERS: Provider[] = [
  ServerRendererFactory2,
  {
    provide: RendererFactory2,
    useFactory: instantiateServerRendererFactory,
    deps: [ServerRendererFactory2, ɵAnimationEngine, NgZone]
  },
  ServerStylesHost,
  {provide: SharedStylesHost, useExisting: ServerStylesHost},
  {provide: EVENT_MANAGER_PLUGINS, multi: true, useClass: ServerEventManagerPlugin},
];

/**
 * The ng module for the server.
 *
 * @experimental
 */
@NgModule({
  exports: [BrowserModule],
  imports: [HttpModule, HttpClientModule, NoopAnimationsModule],
  providers: [
    SERVER_RENDER_PROVIDERS,
    SERVER_HTTP_PROVIDERS,
    {provide: Testability, useValue: null},
    {provide: ViewportScroller, useClass: NullViewportScroller},
  ],
})
export class ServerModule {
}

function _document(injector: Injector, serverDom: ServerDom) {
  let config: PlatformConfig|null = injector.get(INITIAL_CONFIG, null);
  let parseDocument: (html: string, url?: any) => Document;
  switch (serverDom) {
    case ServerDom.JSDOM:
      parseDocument = parseDocumentJsdom;
      break;
    case ServerDom.Domino:
    default:
      parseDocument = parseDocumentDomino;
  }
  if (config && config.document) {
    return parseDocument(config.document, config.url);
  } else {
    return getDOM().createHtmlDocument();
  }
}

/**
 * @experimental
 */
export const platformServer =
    createPlatformFactory(platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS);

/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
export const platformDynamicServer =
    createPlatformFactory(platformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);
