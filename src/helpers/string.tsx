export const decodeText = (html: string) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const getTitleAndArtist = (text: string) => {
  let indexDash = text.indexOf("-");
  let indexUnderscore = text.indexOf("_");
  let result = [text, text];

  console.log(indexDash + " " + indexUnderscore);

  if (indexDash < indexUnderscore || indexUnderscore == -1) {
    if (indexDash != -1) result = text.split("-");
  }
  if (indexUnderscore < indexDash || indexDash == -1) {
    if (indexUnderscore != -1) result = text.split("_");
  }

  console.log(result);
  return result;
};

export const normalizeTitle = (title: string) => {
  var result = title;

  result = result.replace(/\/r/g, "/");
  // result = result.replace("&", " & ");
  result = result.replace("[MV]", "");
  result = result.replace("MV", "");
  // result = result.replace("lyric", "");
  // result = result.replace("official", "");
  // result = result.replace("video", "");
  // result = encodeURIComponent(result);
  console.log(result);
  return result;
};
