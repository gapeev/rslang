const getURLParameter = (sUrl: string, sParam: string) => {
  let sPageURL = sUrl.substring(sUrl.indexOf('?') + 1);
  let sURLVariables = sPageURL.split('&');
  for (let i = 0; i < sURLVariables.length; i++) {
    let sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1];
    }
  }
};
export default getURLParameter;
