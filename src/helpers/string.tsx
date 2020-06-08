export const decodeText = (html: string) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const getTitleAndArtist = (text: string) => {
  let result = [text, text];

  let indexDash = text.indexOf("-");
  let indexUnderscore = text.indexOf("_");

  if (indexDash < indexUnderscore || indexUnderscore == -1) {
    if (indexDash != -1) result = text.split("-");
  }
  if (indexUnderscore < indexDash || indexDash == -1) {
    if (indexUnderscore != -1) result = text.split("_");
  }

  let textToBeSplit = result[1];

  let splitedText = textToBeSplit.split("'");
  if (splitedText.length > 2) {
    if (result[1] === result[0]) {
      result[0] = splitedText[0];
    }
    result[1] = splitedText[1];
    return result;
  }

  return result;
};

export const normalizeTitle = (title: string) => {
  var result = title;

  result = result.replace(/\/r/g, "/");

  let indexStart = title.indexOf("[");
  let indexEnd = title.indexOf("]");
  if (indexStart > -1 && indexEnd > -1 && indexEnd > indexStart) {
    result =
      title.substr(0, indexStart) + title.substr(indexEnd + 1, title.length);
  }

  result = result.replace("Official", "");
  result = result.replace("official", "");

  result = result.replace("Lyrics", "");
  result = result.replace("lyrics", "");
  result = result.replace("Lyric", "");
  result = result.replace("lyric", "");

  result = result.replace("VIDEO", "");
  result = result.replace("Video", "");
  result = result.replace("video", "");

  result = result.replace("HD", "");
  result = result.replace("MV", "");

  result = result.replace("[]", "");
  result = result.replace("[ ]", "");
  result = result.replace("()", "");
  result = result.replace("( )", "");
  // result = result.replace("lyric", "");
  // result = result.replace("official", "");
  // result = result.replace("video", "");
  // result = encodeURIComponent(result);
  return result;
};
