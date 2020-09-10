import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "imageSlice",
  initialState: {
    loading: null,
    images: [],
    showcaseImage: "",
    showcaseImageInfo:{width:'0',display:'none',imgOwner:'',ownerPhoto:''},
  },
  reducers: {
    getShowcaseImage: (state, action) => {
      state.showcaseImage = action.payload.photoURL;
    },
    getAllImages: (state, action) => {
      state.images = action.payload.images;
    },
    setShowcaseImageInfo : (state,action) => {
      return {
        ...state,
        showcaseImageInfo:{...state.showcaseImageInfo,...action.payload},
      }
    }
  },
});

export const { getShowcaseImage, getAllImages,setShowcaseImageInfo } = imageSlice.actions;
const imageReducer = imageSlice.reducer;

export default imageReducer;
