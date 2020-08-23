import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface CountriesState {
  values: Array<any>;
  selected: Array<any>;
}

const initialState: CountriesState = {
  values: [],
  selected: []
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<{ index: number, item: any, amount: number, delta: number }>) => {
      state.selected[action.payload.index].userTempatureValue = action.payload.amount;
      state.selected[action.payload.index].isCorrect = action.payload.delta < 5 || action.payload.delta > -5;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    getAll: (state, action: PayloadAction<Array<any>>) => {

      state.values = action.payload;
    },
    getByAmount: (state, action: PayloadAction<number>) => {
      const index = Math.floor(Math.random() * Math.floor(state.values.length - action.payload));
      state.selected = state.values.slice(index, index + action.payload);
    },
  },
});

export const { getByAmount, setSelected, getAll } = countriesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getByAmountAsync = (amount: number): AppThunk => dispatch => {
  fetch('/city.list.json').then((res) => res.json()).catch((e) => {
    return [];
  }).then((res) => {
    dispatch(getAll(res));
  }).finally(() => {
    dispatch(getByAmount(amount));
  });
};

export const setSelectedAsync = (index: number, item: any, amount: number): AppThunk => dispatch => {

  fetch(`http://api.openweathermap.org/data/2.5/weather?id=${item.id}&appid=9cff733aee57cb05b63dd4f731c46bc4&units=metric`)
    .then(res => res.json())
    .catch(e => {
      debugger
    }).then(res => {
      const delta = amount - res.main.temp;
      dispatch(setSelected({ index, item, amount, delta }));
    });

}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectedCountries = (state: RootState) => state.countries.selected;

export default countriesSlice.reducer;
