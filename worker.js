
export default {
  async fetch(request, env, ctx) {
    let req_url = new URL(request.url);
    let params = req_url.searchParams;

    let srt_url = params.get("url");
    if (!srt_url) {
      return new Response("404", { status: 404 });
    }

    let srt_req = await fetch(srt_url);
    let srt = await srt_req.text();

    let vtt = srtToVtt(srt);    
    return new Response(vtt, {
      headers: {
        "content-type": "text/vtt",
        "access-control-allow-origin": "*"
      }
    });
  },
};


function fixSrt(srt) {
  return srt.replace(/(\d?\d:\d\d:\d\d)[,.](\d+)/g, (_, $1, $2) => {
    let hr = $1;
    if ($1.length === 7) {
      hr = '0' + hr
    } 
    let ms = $2.slice(0, 3)
    if ($2.length === 1) {
      ms = $2 + '00'
    }
    if ($2.length === 2) {
      ms = $2 + '0'
    }
    return `${hr},${ms}`
  })
}


function srtToVtt(srtText) {
  return 'WEBVTT \r\n\r\n'.concat(
    fixSrt(srtText)
      .replace(/\{\\([ibu])\}/g, '</$1>')
      .replace(/\{\\([ibu])1\}/g, '<$1>')
      .replace(/\{([ibu])\}/g, '<$1>')
      .replace(/\{\/([ibu])\}/g, '</$1>')
      .replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, '$1.$2')
      .replace(/{[\s\S]*?}/g, '')
      .concat('\r\n\r\n')
  )
}
