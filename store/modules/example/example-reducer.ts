import {HYDRATE} from 'next-redux-wrapper';
import {AnyAction} from 'redux';

export interface ExampleState {
  exampleState: boolean;
}

export const exampleReducer = (
  state: ExampleState = {exampleState: false},
  action: AnyAction,
) => {
  switch (action.type) {
    case HYDRATE:
      // Reconciliation
      return {...state, ...action.payload};
    case 'EXAMPLE':
      return {...state, exampleState: action.payload};
    default:
      return state;
  }
};
