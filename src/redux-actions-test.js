const  reduxaction = require('redux-actions');
const  redux = require('redux');
const  {createStore} = redux;


const { createActions, handleActions, combineActions,createAction } =reduxaction; 
 
const defaultState = { counter: 10 };
 
const { increment, decrement } = createActions({
  INCREMENT: amount => ({ amount }),
  DECREMENT: amount => ({ amount: -amount })
});
 let test = createAction("AAAA",(a)=>++a,(b)=>b+"meta")
const reducer = handleActions({
  [combineActions(increment, decrement)](state, { payload: { amount } }) {
    return { ...state, counter: state.counter + amount };
  }
}, defaultState);
 

 const store = createStore(
  reducer,defaultState
);
store.subscribe(()=>{
	console.log(	store.getState() )
}) 



	store.dispatch(increment(5))
	console.log(	test(100,"ad") )
