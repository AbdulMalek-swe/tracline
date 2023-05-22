import { createSlice } from "@reduxjs/toolkit";
const ImageData = {
  bg_remove: "",
  business_card: "",
  email_signature: "",
  facebook_cover: "",
  filter_jpg: "",
  filter_png: "",
  input: "",
  instagram_post: "",
  instagram_story: "",
  letterhead: "",
  pdf: "",
  sharpe_jpg: "",
  sharpe_png: "",
  svg: "",
  

};
const addImageSlices = createSlice({
  name: "Image",
  initialState: ImageData,
  reducers: {
    addImage: (state, action) => {
      
      state.bg_remove = action.payload.bg_remove;
      state.business_card = action.payload.business_card;
      state.email_signature = action.payload.email_signature;
      state.facebook_cover = action.payload.facebook_cover;
      state.filter_jpg = action.payload.filter_jpg;
      state.filter_png = action.payload.filter_png;
      state.input = action.payload.input;
      state.instagram_post = action.payload.instagram_post;
      state.instagram_story = action.payload.instagram_story;
      state.letterhead = action.payload.letterhead;
      state.pdf = action.payload.pdf;
      state.sharpe_jpg = action.payload.sharpe_jpg;
      state.sharpe_png = action.payload.sharpe_png;
      state.svg = action.payload.svg;
       
    },

  },
});

export default addImageSlices.reducer;
export const addImageActions = addImageSlices.actions;
