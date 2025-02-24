/*
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { PolicyComponentState } from './index';
import { createReducer, on } from '@ngrx/store';
import {
    loadPolicyComponent,
    loadPolicyComponentSuccess,
    resetPolicyComponentState,
    policyComponentApiError
} from './policy-component.actions';

export const initialState: PolicyComponentState = {
    label: '',
    resource: '',
    allowRemoteAccess: false,
    loadedTimestamp: '',
    error: null,
    status: 'pending'
};

export const policyComponentReducer = createReducer(
    initialState,
    on(loadPolicyComponent, (state) => ({
        ...state,
        status: 'loading' as const
    })),
    on(loadPolicyComponentSuccess, (state, { response }) => ({
        ...state,
        label: response.label,
        resource: response.resource,
        allowRemoteAccess: response.allowRemoteAccess,
        status: 'success' as const
    })),
    on(policyComponentApiError, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error' as const
    })),
    on(resetPolicyComponentState, (state) => ({
        ...initialState
    }))
);
