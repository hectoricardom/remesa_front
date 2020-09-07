import * as _Util from '../../store/Util'



/*






import t3 from '../t3.json'

let data = {}
let size = 0;
let duration = 0;
let timeScale = 0;
let trtr = {}


let sashObj = {}
sashObj["media"] = {}
trtr["size"]  = 0;
trtr["earliest_presentation_time"]  = 0;
trtr["timeScale"]  = 0;

let sumSize  = 0;
let sqNum  = 0;
let prevbsMd = 0;

t3.map(s=>{
  if(s["name"]=== "moov"){   
    sumSize += s["size"];
    sashObj["init"] = sumSize;
    s["children"].map(ch=>{
      if(ch["timescale"]){
        sashObj["timeScaleMoov"] = ch["timescale"];        
      }
      if(ch["children"]){
        ch["children"].map(_ch22=>{          
          if(_ch22["name"] === "mehd"){
            sashObj["duration"] =  _ch22["duration"]
          }
          if(_ch22["name"] === "mdia"){
            _ch22["children"].map(_ch_mdia=>{
              console.log(_ch_mdia);
              if(_ch_mdia["timescale"]){
                sashObj["timescale"] = _ch_mdia["timescale"];  
              }
              
            })
          }
          if(_ch22["name"] === "tkhd" && _ch22["height"]){
            sashObj["height"]  =   _ch22["height"];
            sashObj["width"]  =   _ch22["width"];
          }
        })
      }
    })
  }
  else if(s["name"]=== "moof"){
    let bsMd = 0;
    s["children"].map(chl=>{
      if(chl["sequence number"]){
        sqNum = chl["sequence number"];
      }
      if(chl["children"]){
        chl["children"].map(chl22=>{
          if(chl22["base media decode time"]){
            bsMd = chl22["base media decode time"];
          }
        })
      }
    })
  
    sashObj["media"][sqNum] = {bsMd:bsMd,start:sumSize,segD:bsMd - prevbsMd }
    prevbsMd = bsMd;
    sumSize += s["size"]

    //"base media decode time": 211500000
    //sashObj["media"][]
    //console.log(s)
  }else if(s["name"]=== "mdat"){
    sumSize += s["size"]
    sashObj["media"][sqNum]["end"] = sumSize-1
  }
  else{
    sumSize += s["size"]
  }
})
console.log(sashObj)



/*



// VP9_DASH_PARAMS="-tile-columns 4 -frame-parallel 1"

// ffmpeg -i 5OTioswAuhPzW0QW_original.mp4 -c:v libvpx-vp9 -s 640x360 -threads 4 -b:v 750k -keyint_min 150 -g 60 -tile-columns 4 -frame-parallel 1 -an -metadata title="" -metadata encoder="ffmpeg" -r 30 -f webm -dash 1 long_video_360p_750k.webm



/*



  mp4dash [type=audio,language=en]ii.mpa [type=video]ii.mp4

VIDEO_TITLE="My Cool Video"


# DASH VP9
VP9_DASH_PARAMS="-tile-columns 4 -frame-parallel 1"


# create videos in different qualities
ffmpeg -i input.mp4 -c:v libvpx-vp9 -s 160x90 -threads 4 -b:v 250k -keyint_min 150 -g 60 ${VP9_DASH_PARAMS} -an -metadata title=${VIDEO_TITLE} -metadata encoder="ffmpeg" -r 30 -f webm -dash 1 long_video_90p_250k.webm
ffmpeg -i input.mp4 -c:v libvpx-vp9 -s 320x180 -threads 4 -b:v 500k -keyint_min 150 -g 60 ${VP9_DASH_PARAMS} -an -metadata title=${VIDEO_TITLE} -metadata encoder="ffmpeg" -r 30 -f webm -dash 1 long_video_180p_500k.webm
ffmpeg -i input.mp4 -c:v libvpx-vp9 -s 640x360 -threads 4 -b:v 750k -keyint_min 150 -g 60 ${VP9_DASH_PARAMS} -an -metadata title=${VIDEO_TITLE} -metadata encoder="ffmpeg" -r 30 -f webm -dash 1 long_video_360p_750k.webm
ffmpeg -i input.mp4 -c:v libvpx-vp9 -s 640x360 -threads 4 -b:v 1000k -keyint_min 150 -g 60 ${VP9_DASH_PARAMS} -an -metadata title=${VIDEO_TITLE} -metadata encoder="ffmpeg" -r 30 -f webm -dash 1 long_video_360p_1000k.webm
ffmpeg -i input.mp4 -c:v libvpx-vp9 -s 1280x720 -threads 4 -b:v 1500k -keyint_min 150 -g 60 ${VP9_DASH_PARAMS} -an -metadata title=${VIDEO_TITLE} -metadata encoder="ffmpeg" -r 30 -f webm -dash 1 long_video_720p_500k.webm

# audio track
ffmpeg -i input.mp4 -c:a libvorbis -b:a 128k -vn -r 30 -f webm -dash 1 long_audio_128k.webm


# set cue points
./bin/sample_muxer -i long_video_90p_250k.webm -o long_video_90p_250k_cued.webm
./bin/sample_muxer -i long_video_180p_500k.webm -o long_video_180p_500k_cued.webm
./bin/sample_muxer -i long_video_360p_750k.webm -o long_video_360p_750k_cued.webm
./bin/sample_muxer -i long_video_360p_1000k.webm -o long_video_360p_1000k_cued.webm
./bin/sample_muxer -i long_video_720p_500k.webm -o long_video_720p_500k_cued.webm

# for the audio too
ffmpeg -i long_audio_128k.webm -vn -acodec libvorbis -ab 128k -dash 1 long_audio_128k_cued.webm


# create dash manifest
ffmpeg \
 -analyzeduration 2147483647 -probesize 2147483647 \
 -f webm_dash_manifest -i long_video_90p_250k_cued.webm \
 -f webm_dash_manifest -i long_video_180p_500k_cued.webm \
 -f webm_dash_manifest -i long_video_360p_750k_cued.webm \
 -f webm_dash_manifest -i long_video_360p_1000k_cued.webm \
 -f webm_dash_manifest -i long_video_720p_500k_cued.webm \
 -f webm_dash_manifest -i long_audio_128k_cued.webm \
 -c copy -map 0 -map 1 -map 2 -map 3 -map 4 -map 5 \
 -f webm_dash_manifest \
 -adaptation_sets "id=0,streams=0,1,2,3,4 id=1,streams=5" \
 long_manifest.mpd









window.HrmPlayer={};


window.HrmPlayer.config={
  "url":"http://localhost:7070",
  "path":"Stream2HRM",
  "id":"u6W6xnf7YZ3oxuO4",
  "videoExt":"hlm",
  "progressThumbnail":false,
  "adaptative":true
}



*/






/*

const OpenModal = (dispatch, data) => {

    let list = data.list;
    let Id = _Util.gen12CodeId();
    if(!list[Id]){
      list[Id]={};
    }
    list[Id]['visible']=true;
    let _dataProps = {}
    if(!data['props']){
      _dataProps['modalID'] = Id
    }else{
      _dataProps = data['props'];
      _dataProps['modalID'] = Id;
    }       
    list[Id]['observeResize'] = data['observeResize'];
    if(list[Id]['observeResize']){
      list[Id]['observeInterval'] = setInterval(()=>{
        let cmp = document.getElementById(Id);
        cmp = document.querySelector(`[dialog-key-id='${Id}']`);
        let dmz = cmp && cmp.getBoundingClientRect();      
        if(dmz){
          if(dmz.width!== list[Id]['width'] || dmz.height!== list[Id]['height']){
            list[Id]['height']=dmz.height;   
            list[Id]['width']=dmz.width;   
            dispatch({
              type: 'UPD_KEY_VALUE',
              kv:{key:'listDialog',value:list}
            })
            dispatch({
              type: 'UPD_KEY_VALUE',
              kv:{key:'observeCommonChanges',value:_Util.gen12CodeId()}
            })
          }
        }
      },125)
    }
    setTimeout(()=>{     
      list[Id]['display']=true;
      if(data['zIndex']){
        list[Id]['zIndex']=data['zIndex']
      }
      if(data['height']){
        list[Id]['height']=data['height']
      }
      if(data['width']){
        list[Id]['width']=data['width']
      }  
      if(data['content']){
        list[Id]['content']=data['content']
      }
      list[Id]['data']=_dataProps;
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'listDialog',value:list}
      })
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeCommonChanges',value:_Util.gen12CodeId()}
      })
    },175)
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'listDialog',value:list}
    })
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeCommonChanges',value:_Util.gen12CodeId()}
    })
  
}



const CloseModal = (dispatch, data) => {
  let list = data.list;  
  let Id = data['id'];
  if(list[Id]){
    list[Id]['display']=false;
    if(list[Id]['observeResize']){
      if(list[Id]['observeInterval']){
        clearInterval(list[Id]['observeInterval'])
      }
    }
    setTimeout(()=>{
      delete list[Id];
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'listDialog',value:list}
      })
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observeCommonChanges',value:_Util.gen12CodeId()}
      })
    },275)
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'listDialog',value:list}
    })
    dispatch({
      type: 'UPD_KEY_VALUE',
      kv:{key:'observeCommonChanges',value:_Util.gen12CodeId()}
    })
  }
}





export const UpdateModal = (dispatch, data) => {
  
}


*/





export function LoadData(dispatch) {

   var config = window.HrmPlayer?window.HrmPlayer.config:{};
   //var _url = window.HrmConfig["url"]+"/"+window.HrmConfig["path"]+"/"+id+".hlm";
   let urlHLm = window.urlHLm;
   //console.log({_url})
   if(config && config.url){   
     
      //_Util.getHlsSDK(config.url);   
     //_url = `${config.url}/${config.path}/${config.id}.${config.videoExt}`;
   }
   /*if(_url){
     dispatch({
       type: 'UPD_KEY_VALUE',
       kv:{key:'_url',value:_url}
     })
     dispatch({
       type: 'UPD_KEY_VALUE',
       kv:{key:'observeCommonChanges',value:_Util.gen12CodeId()}
     }) 
     loadHLSdata(_url, dispatch)
   }*/
 };





/*

 const loadMasterSash = (a) => {
   let dataSash = {}
   dataSash["sash_version"] = 2;
   dataSash["presentation_duration"] = 300;
   dataSash["video"] = [];
   dataSash["audio"] = [];
    a.map((_adaptative,ia2)=>{
      let rp = _adaptative["Representation"];
      let rps = {} 
      rps["mime_type"] = rp["mimeType"];
      rps["bandwidth"] = parseFloat(rp["bandwidth"]);
      rps["codecs"] = rp["codecs"];
      rps["segment_template"] = loadSASHSegm(rp)
      if(rp["mimeType"]==="audio/mp4"){
        dataSash["audio"].push(rps)
      }else if(rp["mimeType"]==="video/mp4"){
        dataSash["video"].push(rps)
      }
    })
    return JSON.stringify(dataSash);
 }




 const loadSASHSegm = (rp) => {
  let BaseURL = rp["BaseURL"]
  let SegmentList = rp["SegmentList"];
  let duration = SegmentList && SegmentList["duration"]/SegmentList["timescale"];
  let SegmentURL = SegmentList && SegmentList["SegmentURL"];
  let rangeInit  = SegmentList["Initialization"]["range"].split('-');
  let startInit = (rangeInit[0])*1;
  let endInit = (rangeInit[1])*1;

let vDur = 0

  let h ={};
  h["duration"] =duration;
 
  h["init"] =`${BaseURL}?range=${startInit}-${endInit+44}`;
  h["media"] =[];

  SegmentURL.map((sg,ind)=>{    
      vDur += duration;
      let range  = sg["mediaRange"].split('-');
      let start = (range[0])*1;
      let end = (range[1])*1;      
      h["media"].push(`${BaseURL}?idx=${ind}&type=${rp["mimeType"]}&range=${start+44}-${end+44}`);
        
  })
  
  h["Videoduration"] =vDur;
  return h;
}






 const loadm3u8Master2 = (a) => {
    let m3 = `#EXTM3U\n#EXT-X-VERSION:6\n#EXT-X-INDEPENDENT-SEGMENTS`;
    let audioCodec = null;
    let codeV = "avc1.4D4032,mp4a.40.2";
    a.map((_adaptative,ia2)=>{
      let rp = _adaptative["Representation"];  
      if(rp["mimeType"]==="audio/mp4"){
        let blob = loadm3u8Segm(rp);
        if(rp["codecs"] !== "ac-3"){
          audioCodec = rp["codecs"];
          m3 += `#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio_${ia2+1}",NAME="English stereo",LANGUAGE="${_adaptative["lang"]}",${ia2===0?"AUTOSELECT=YES":""},URI="${blob}"\n`
        }
      }
    })
    a.map(_adaptative=>{  
      //console.log(_adaptative) 
      let rp = _adaptative["Representation"]; 
      if(Array.isArray(rp)){        
        if(rp[0]["mimeType"]==="video/mp4"){
          let blob = loadm3u8Segm(rp[0]);
          codeV = "avc1.4D4032,mp4a.40.2";          
          if(audioCodec === "ac-3"){
            codeV = "avc1.4D4032"
          }
          if(audioCodec === ".mp3"){
            codeV = codeV = "avc1.4D4032,mp4a.40.34";
          }
          m3 += `#EXT-X-STREAM-INF:BANDWIDTH=${rp[0]["bandwidth"]},CODECS="${codeV}",RESOLUTION=${rp[0]["width"]}X${rp[0]["height"]}${audioCodec?`,AUDIO="audio_${1}"`:""}\n${blob}\n`
        }
      }else if(rp["mimeType"]==="video/mp4"){
        let blob = loadm3u8Segm(rp);
        codeV = "avc1.4D4032,mp4a.40.2";
        
        if(audioCodec === "ac-3"){
          codeV = "avc1.4D4032"
        }
        if(audioCodec === ".mp3"){
          codeV = codeV = "avc1.4D4032,mp4a.40.34";
        }
        //console.log(rp) 
        // let videoCode = `${rp["codecs"]},${audioCodec}`
        m3 += `#EXT-X-STREAM-INF:BANDWIDTH=${rp["bandwidth"]},CODECS="${codeV}",RESOLUTION=${rp["width"]}X${rp["height"]}${audioCodec?`,AUDIO="audio_${1}"`:""}\n${blob}\n`
      }
    })
    m3 += `#EXT-X-ENDLIST`
    let base64Track = _Util.Base64.encode(m3);  
    let arrayBufferView = base64ToArrayBuffer(base64Track);
    let blob = new Blob( [ arrayBufferView ], { type: 'text/plain' } );
    let urlCreator = window.URL || window.webkitURL;
    let blobUrl = urlCreator.createObjectURL(blob);
    return blobUrl;
}







 const loadm3u8Segm2 = (rp) => {
  let BaseURL = rp["BaseURL"]
  let SegmentList = rp["SegmentList"];
  let duration = SegmentList && SegmentList["duration"]/SegmentList["timescale"];
  let SegmentURL = SegmentList && SegmentList["SegmentURL"];
  let h =``;



  SegmentURL.map((sg,ind)=>{

      
      let range  = sg["mediaRange"].split('-');
      let start = (range[0])*1;
      let end = (range[1])*1;
      
       h +=`#EXTINF:${duration}\n${BaseURL}?idx=${ind}&type=${rp["mimeType"]}&range=${start+44}-${end+44}\n`   
      
  
  })
  let rangeInit  = SegmentList["Initialization"]["range"].split('-');
  let start = (rangeInit[0])*1;
  let end = (rangeInit[1])*1;

  let m3 = `#EXTM3U\n#EXT-X-TARGETDURATION:${duration}\n#EXT-X-VERSION:7\n#EXT-X-MEDIA-SEQUENCE:1\n#EXT-X-PLAYLIST-TYPE:VOD\n#EXT-X-INDEPENDENT-SEGMENTS\n#EXT-X-MAP:URI="${BaseURL}?range=${start}-${end+44}"\n`
  m3 += h;
  m3 += `#EXT-X-ENDLIST`
  let base64Track = _Util.Base64.encode(m3);  
  let arrayBufferView = base64ToArrayBuffer(base64Track);
  let blob = new Blob( [ arrayBufferView ], { type: 'text/plain' } );
  let urlCreator = window.URL || window.webkitURL;
  let blobUrl = urlCreator.createObjectURL(blob);
  return blobUrl;

}


if(false && this.response["mpd"]){

            let dashjs = window.dashjs;
            console.log(dashjs)
            if(dashjs){
              var _url = `http://192.168.1.12:7070/Stream28/${this.response["mpd"]}.mpd`;
              

              // chrome-extension://hlalpgbimjgbobcbpfdhidnhhiigjnlj/index.html#https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s-fmp4/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8

              // _url = "https://raw.githubusercontent.com/hectoricardom/hectoricardom.github.io/master/data/hhh.mpd"
              // _url = "http://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd"
              // _url = "https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd"

           
              var player = dashjs.MediaPlayer().create();

             // player.initialize(_player, _url, true);  
              window.dashHLM = player;
            }
        


          }else








let bndwLst = {
  "320X180":628000,
  "480X270":928000,
  "640X360":1728000,
  "960X540":2281000,
  "1280X720":4404000,
  "1920X1080":8108000
}


const loadm3u8Master = (a) => {
  let m3 = `#EXTM3U\n#EXT-X-VERSION:6\n#EXT-X-INDEPENDENT-SEGMENTS\n`;
  let audioCodec = null;
  let codeV = "avc1.4D4032,mp4a.40.2";
  a["audio"].map((rp,ia2)=>{
    let blob = loadm3u8Segm(rp);
    if(rp["codec"] !== "ac-3"){
      audioCodec = rp["codec"];
      m3 += `#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio_${ia2+1}",NAME="English stereo",LANGUAGE="${rp["lang"]?rp["lang"]:"und"}",${ia2===0?"AUTOSELECT=YES":""},URI="${blob}"\n`
    }
  })
  a["video"].map(rp=>{
      let blob = loadm3u8Segm(rp);
      codeV = "avc1.4D4032,mp4a.40.2";
     
      //console.log(rp) 
      // let videoCode = `${rp["codecs"]},${audioCodec}`
      codeV = `${rp["codec"]}${audioCodec?`,${audioCodec}`:""}`;
      let _resolution = `${rp["width"]}X${rp["height"]}`;
      let bnDw = bndwLst[_resolution] || rp["bandwidth"];
      console.log(_resolution)
      console.log(bndwLst)
      console.log(bndwLst[_resolution])
      console.log(bnDw)

      m3 += `#EXT-X-STREAM-INF:BANDWIDTH=${bnDw},CODECS="${codeV}",RESOLUTION=${_resolution}${audioCodec?`,AUDIO="audio_${1}"`:""}\n${blob}\n`;
  })
  m3 += `#EXT-X-ENDLIST`;
  let base64Track = _Util.Base64.encode(m3);  
  let arrayBufferView = base64ToArrayBuffer(base64Track);
  let blob = new Blob( [ arrayBufferView ], { type: 'text/plain' } );
  let urlCreator = window.URL || window.webkitURL;
  let blobUrl = urlCreator.createObjectURL(blob);
  return blobUrl;
}







const loadm3u8Segm = (rp) => {

let segmentTemplate = rp["segment_template"];
let BaseURL = rp["baseUrl"]

let duration = rp["duration"];
let SegmentURL = segmentTemplate["media"];
let h =``;

let ssid = 0;

let rangeInit  = segmentTemplate["init"];
let start = 0;
let end = (rangeInit[1])*1;
let segMStart = end+1;
let segDuration = 0;
let St =  SegmentURL.length
SegmentURL.map((sg,ind)=>{
    let start = (sg[0])*1;
    let end = (sg[1])*1; 
    let dur =null; 
    if(sg[2]){
      dur = (sg[2])*1;
    }
       
    h +=`#EXTINF:${dur?dur:segmentTemplate["duration"]}\n${BaseURL}?idx=${ind+1}&type=${rp["mimetype"]}&range=${start+ssid}-${end+ssid}\n`
})


let m3 = `#EXTM3U\n#EXT-X-TARGETDURATION:${duration}\n#EXT-X-VERSION:7\n#EXT-X-MEDIA-SEQUENCE:1\n#EXT-X-PLAYLIST-TYPE:VOD\n#EXT-X-INDEPENDENT-SEGMENTS\n#EXT-X-MAP:URI="${BaseURL}?range=${start}-${end}"\n`
m3 += h;
m3 += `#EXT-X-ENDLIST`
let base64Track = _Util.Base64.encode(m3);  
let arrayBufferView = base64ToArrayBuffer(base64Track);
let blob = new Blob( [ arrayBufferView ], { type: 'text/plain' } );
let urlCreator = window.URL || window.webkitURL;
let blobUrl = urlCreator.createObjectURL(blob);
return blobUrl;

}

export const dashMPD = () => {

    let m3 = `<?xml version="1.0" encoding="utf-8"?>
    <MPD xmlns="urn:mpeg:dash:schema:mpd:2011" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:cenc="urn:mpeg:cenc:2013" xmlns:hulu="urn:com:hulu:schema:mpd:2015" profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" type="static" minBufferTime="PT5.0S" mediaPresentationDuration="PT2592.34S">
    <Period    id="Content"        start="PT0S"    duration="PT2592.34S">
        <AssetIdentifier schemeIdUri="urn:com:hulu:asset-id:2016" value="60568113"/>
        <AdaptationSet mimeType="audio/mp4" segmentAlignment="true" bitstreamSwitching="true"        lang="es"            label="main">
            <ContentProtection schemeIdUri="urn:mpeg:dash:mp4protection:2011" value="cenc" cenc:default_KID="a132a4d9fd745bd3976ca0056b3f4645"/>
            <ContentProtection schemeIdUri="urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"    />
            <ContentProtection schemeIdUri="urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95"    />
            <InbandEventStream schemeIdUri="www.nielsen.com:id3:v1" value="1"/>
            <Role schemeIdUri="urn:mpeg:dash:role:2011" value="main"/>
            <Representation id="97845731" codecs="mp4a.40.5" bandwidth="72406"  startWithSAP="1"             audioSamplingRate="48000">
                <AudioChannelConfiguration schemeIdUri="urn:mpeg:dash:23003:3:audio_channel_configuration:2011" value="2"/>
                <hulu:Cdn>da</hulu:Cdn>
                <BaseURL>https://http-a-darwin.hulustream.com/113/60568113/agave50786792_33543046_H264_1000_33544177_audio.mp4?authToken=1594323211_844d9f67795e6783d1a65d52cffedcf6</BaseURL>
                <SegmentBase indexRange="1483-7622" indexRangeExact="true">
                    <Initialization range="0-1482"/>
                </SegmentBase>
            </Representation>
            <Representation id="97845731" codecs="mp4a.40.5" bandwidth="72406"  startWithSAP="1"             audioSamplingRate="48000">
                <AudioChannelConfiguration schemeIdUri="urn:mpeg:dash:23003:3:audio_channel_configuration:2011" value="2"/>
                <hulu:Cdn>de</hulu:Cdn>
                <BaseURL>https://http-e-darwin.hulustream.com/113/60568113/agave50786792_33543046_H264_1000_33544177_audio.mp4?expire=1594323211&amp;token=28f26fc0f33bd7f7056a90eba89f0e8a</BaseURL>
                <SegmentBase indexRange="1483-7622" indexRangeExact="true">
                    <Initialization range="0-1482"/>
                </SegmentBase>
            </Representation>
            <Representation id="97845731" codecs="mp4a.40.5" bandwidth="72406"  startWithSAP="1"             audioSamplingRate="48000">
                <AudioChannelConfiguration schemeIdUri="urn:mpeg:dash:23003:3:audio_channel_configuration:2011" value="2"/>
                <hulu:Cdn>dv</hulu:Cdn>
                <BaseURL>https://http-v-darwin.hulustream.com/113/60568113/agave50786792_33543046_H264_1000_33544177_audio.mp4?end=20200709193331&amp;authToken=0b7ca6791400c2c159a64</BaseURL>
                <SegmentBase indexRange="1483-7622" indexRangeExact="true">
                    <Initialization range="0-1482"/>
                </SegmentBase>
            </Representation>
        </AdaptationSet>
        <AdaptationSet mimeType="video/mp4" segmentAlignment="true" bitstreamSwitching="true"        maxWidth="704" maxHeight="396">
            <ContentProtection schemeIdUri="urn:mpeg:dash:mp4protection:2011" value="cenc" cenc:default_KID="a132a4d9fd745bd3976ca0056b3f4645"/>
            <ContentProtection schemeIdUri="urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"    >
                <cenc:pssh>AAAASHBzc2gAAAAA7e+LqXnWSs6jyCfc1R0h7QAAACgIARIQoTKk2f10W9OXbKAFaz9GRRoEaHVsdSIINTA3ODY3OTIqAkhE</cenc:pssh>
            </ContentProtection>
            <ContentProtection schemeIdUri="urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95"    >
                <cenc:pssh>AAACvHBzc2gAAAAAmgTweZhAQoarkuZb4IhflQAAApycAgAAAQABAJICPABXAFIATQBIAEUAQQBEAEUAUgAgAHgAbQBsAG4AcwA9ACIAaAB0AHQAcAA6AC8ALwBzAGMAaABlAG0AYQBzAC4AbQBpAGMAcgBvAHMAbwBmAHQALgBjAG8AbQAvAEQAUgBNAC8AMgAwADAANwAvADAAMwAvAFAAbABhAHkAUgBlAGEAZAB5AEgAZQBhAGQAZQByACIAIAB2AGUAcgBzAGkAbwBuAD0AIgA0AC4AMAAuADAALgAwACIAPgA8AEQAQQBUAEEAPgA8AFAAUgBPAFQARQBDAFQASQBOAEYATwA+ADwASwBFAFkATABFAE4APgAxADYAPAAvAEsARQBZAEwARQBOAD4APABBAEwARwBJAEQAPgBBAEUAUwBDAFQAUgA8AC8AQQBMAEcASQBEAD4APAAvAFAAUgBPAFQARQBDAFQASQBOAEYATwA+ADwASwBJAEQAPgAyAGEAUQB5AG8AWABUADkAMAAxAHUAWABiAEsAQQBGAGEAegA5AEcAUgBRAD0APQA8AC8ASwBJAEQAPgA8AEMASABFAEMASwBTAFUATQA+AFkAYgA3ADEAWABxAGQAbgBaAGsARQA9ADwALwBDAEgARQBDAEsAUwBVAE0APgA8AEMAVQBTAFQATwBNAEEAVABUAFIASQBCAFUAVABFAFMAPgA8AC8AQwBVAFMAVABPAE0AQQBUAFQAUgBJAEIAVQBUAEUAUwA+ADwATABBAF8AVQBSAEwAPgBoAHQAdABwAHMAOgAvAC8AcABsAGEAeQAuAGgAdQBsAHUALgBjAG8AbQA8AC8ATABBAF8AVQBSAEwAPgA8AC8ARABBAFQAQQA+ADwALwBXAFIATQBIAEUAQQBEAEUAUgA+AA==</cenc:pssh>
            </ContentProtection>
            <Representation id="97845731" codecs="avc1.64001E" bandwidth="1325779"  startWithSAP="1"             width="704" height="396" frameRate="24000/1001">
                <hulu:ProfileBandwidth>1000</hulu:ProfileBandwidth>
                <hulu:Cdn>da</hulu:Cdn>
                <BaseURL>https://http-a-darwin.hulustream.com/113/60568113/agave50786792_33543046_H264_1000_33544177_video.mp4?authToken=1594323211_7644339959c5783afd9f5cf6fc81158a</BaseURL>
                <SegmentBase indexRange="1536-7807" indexRangeExact="true">
                    <Initialization range="0-1535"/>
                </SegmentBase>
            </Representation>
            <Representation id="97845731" codecs="avc1.64001E" bandwidth="1325779"  startWithSAP="1"             width="704" height="396" frameRate="24000/1001">
                <hulu:ProfileBandwidth>1000</hulu:ProfileBandwidth>
                <hulu:Cdn>de</hulu:Cdn>
                <BaseURL>https://http-e-darwin.hulustream.com/113/60568113/agave50786792_33543046_H264_1000_33544177_video.mp4?expire=1594323211&amp;token=ae336bfa8d6b657c1430bc6fc6249841</BaseURL>
                <SegmentBase indexRange="1536-7807" indexRangeExact="true">
                    <Initialization range="0-1535"/>
                </SegmentBase>
            </Representation>
            <Representation id="97845731" codecs="avc1.64001E" bandwidth="1325779"  startWithSAP="1"             width="704" height="396" frameRate="24000/1001">
                <hulu:ProfileBandwidth>1000</hulu:ProfileBandwidth>
                <hulu:Cdn>dv</hulu:Cdn>
                <BaseURL>https://http-v-darwin.hulustream.com/113/60568113/agave50786792_33543046_H264_1000_33544177_video.mp4?end=20200709193331&amp;authToken=0d966cafaf869e08433b6</BaseURL>
                <SegmentBase indexRange="1536-7807" indexRangeExact="true">
                    <Initialization range="0-1535"/>
                </SegmentBase>
            </Representation>
            <Representation id="97845729" codecs="avc1.640015" bandwidth="467238"  startWithSAP="1"             width="512" height="288" frameRate="24000/1001">
                <hulu:ProfileBandwidth>400</hulu:ProfileBandwidth>
                <hulu:Cdn>da</hulu:Cdn>
                <BaseURL>https://http-a-darwin.hulustream.com/113/60568113/agave50786792_33543044_H264_400_33544175_video.mp4?authToken=1594323211_2802924e9c9176861d5d7927f6f4faec</BaseURL>
                <SegmentBase indexRange="1536-7807" indexRangeExact="true">
                    <Initialization range="0-1535"/>
                </SegmentBase>
            </Representation>
            <Representation id="97845729" codecs="avc1.640015" bandwidth="467238"  startWithSAP="1"             width="512" height="288" frameRate="24000/1001">
                <hulu:ProfileBandwidth>400</hulu:ProfileBandwidth>
                <hulu:Cdn>de</hulu:Cdn>
                <BaseURL>https://http-e-darwin.hulustream.com/113/60568113/agave50786792_33543044_H264_400_33544175_video.mp4?expire=1594323211&amp;token=ccc836950cbd5824e72ed6620fdc70da</BaseURL>
                <SegmentBase indexRange="1536-7807" indexRangeExact="true">
                    <Initialization range="0-1535"/>
                </SegmentBase>
            </Representation>
            <Representation id="97845729" codecs="avc1.640015" bandwidth="467238"  startWithSAP="1"             width="512" height="288" frameRate="24000/1001">
                <hulu:ProfileBandwidth>400</hulu:ProfileBandwidth>
                <hulu:Cdn>dv</hulu:Cdn>
                <BaseURL>https://http-v-darwin.hulustream.com/113/60568113/agave50786792_33543044_H264_400_33544175_video.mp4?end=20200709193331&amp;authToken=04a1a47e59208126c47a7</BaseURL>
                <SegmentBase indexRange="1536-7807" indexRangeExact="true">
                    <Initialization range="0-1535"/>
                </SegmentBase>
            </Representation>
            <Representation id="97845964" codecs="avc1.64001E" bandwidth="856580"  startWithSAP="1"             width="640" height="360" frameRate="24000/1001">
                <hulu:ProfileBandwidth>650</hulu:ProfileBandwidth>
                <hulu:Cdn>da</hulu:Cdn>
                <BaseURL>https://http-a-darwin.hulustream.com/113/60568113/agave50786792_33543045_H264_650_33544281_video.mp4?authToken=1594323211_7c5e9b51a15ad6407a07b300b33e1f95</BaseURL>
                <SegmentBase indexRange="1537-7808" indexRangeExact="true">
                    <Initialization range="0-1536"/>
                </SegmentBase>
            </Representation>
            <Representation id="97845964" codecs="avc1.64001E" bandwidth="856580"  startWithSAP="1"             width="640" height="360" frameRate="24000/1001">
                <hulu:ProfileBandwidth>650</hulu:ProfileBandwidth>
                <hulu:Cdn>de</hulu:Cdn>
                <BaseURL>https://http-e-darwin.hulustream.com/113/60568113/agave50786792_33543045_H264_650_33544281_video.mp4?expire=1594323211&amp;token=d45d357263ea2c82f0d8daf87f949199</BaseURL>
                <SegmentBase indexRange="1537-7808" indexRangeExact="true">
                    <Initialization range="0-1536"/>
                </SegmentBase>
            </Representation>
            <Representation id="97845964" codecs="avc1.64001E" bandwidth="856580"  startWithSAP="1"             width="640" height="360" frameRate="24000/1001">
                <hulu:ProfileBandwidth>650</hulu:ProfileBandwidth>
                <hulu:Cdn>dv</hulu:Cdn>
                <BaseURL>https://http-v-darwin.hulustream.com/113/60568113/agave50786792_33543045_H264_650_33544281_video.mp4?end=20200709193331&amp;authToken=00a1bb8e0b78c9d1e9b2d</BaseURL>
                <SegmentBase indexRange="1537-7808" indexRangeExact="true">
                    <Initialization range="0-1536"/>
                </SegmentBase>
            </Representation>
        </AdaptationSet>
      </Period>
    </MPD>
    
    `




  m3 += ``
  let base64Track = _Util.Base64.encode(m3);  
  let arrayBufferView = base64ToArrayBuffer(base64Track);

  let base64S =   "AAAASHBzc2gAAAAA7e+LqXnWSs6jyCfc1R0h7QAAACgIARIQQnIKPYzpXb6JSBQYI4rfiBoEaHVsdSIINTEzODkwNTMqAkhE"
  let ab = base64ToArrayBuffer(base64S);
  console.log({ab})
  let blob = new Blob( [ arrayBufferView ], { type: 'text/plain' } );
  let urlCreator = window.URL || window.webkitURL;
  let blobUrl = urlCreator.createObjectURL(blob);
  return blobUrl;

}

*/






export const loadHLSdataByUrl = (id, dispatch, updKV, state,bookmarkPositionID,bookmarkPositionTimeline, mediaId) => {
  updKV("loadedVideo",false);
  updKV("hls",null);
  updKV("currentTime",0);
  updKV("W2Seek",false);
  updKV("dragging",false);
  updKV("duration",0);
  updKV("UrlHlm",null)
  updKV("timelineUpdated",false)     
  updKV("bookmarkPositionID",bookmarkPositionID)
  updKV("bookmarkPositionTimeline",bookmarkPositionTimeline)
  updKV("mediaId",mediaId) ;
  let _state = _Util.getStore();
  var _watchpath = {pathname:`/watch`,search:`?v=${id}` };
  //_state["route_history"].push(_watchpath);  
 setTimeout(()=>{     
  //getVideoHLMById(id,dispatch,state);  
  loadMediadata("url",dispatch, _watchpath );    
 },20)
}




export const loadMediadata = (url, dispatch,pathRoute) => {

  
  let Hls = window.Hls;  

  let keys = _Util.getGlobalsKeys()
  let IdVideo = keys[95];
  let id_v = `${IdVideo}_video`;
  let _player = document.getElementById(id_v);
  let _urlM3U8 = "https://5b44cf20b0388.streamlock.net:8443/vod/smil:bbb.smil/playlist.m3u8";
  
  if( Hls && _player){
    let hls = new Hls();
    window._hlsHRM = hls;
    hls.loadSource(_urlM3U8);
    hls.attachMedia(_player);
    
    var playPromise = _player.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {                    
        _Util.updPlayerStore("requestNext",false);
        _Util.updPlayerStore("duration",_player.duration);
        _Util.updPlayerStore("isplaying",true);
      })
      .catch(error => {
      //console.log(error)
      });
    }
  
    hls.on(Hls.Events.MANIFEST_PARSED, function() {            
      //_player.play();
    });

    hls.on(Hls.Events.ERROR, (e,data) => {
     //console.log({e}) 
     //console.log({data}) 
    });
    hls.on(Hls.Events.FRAG_LOADED, function(e,data) {
    // console.log({e}) 
    //  console.log({data}) 
    });
    //updKV('audio_list',hls.audioTrackController.tracks);
    //updKV('subtitle_list',hls.subtitleTrackController.tracks);
  
  }

}




/*

 export const loadMediadata22 = (url, dispatch,pathRoute,_tid) => {

  var xhr = new XMLHttpRequest();
    xhr.open( "GET", url, true );
    xhr.responseType = "json";
    xhr.onload = function( e ) {
      if (xhr.status === 200) {          
        var param = url.split('/').pop();
        var IdV = param.split('.')[0];
        if(this.response){
          let state = _Util.getStore();
          let keys = _Util.getGlobalsKeys()
          let IdVideo = keys[95];
          let id_v = `${IdVideo}_video`;
         
           if(this.response["sash"]){
            if(this.response["sash"]["video"].length>0){
              if(pathRoute){
                state["route_history"].push(pathRoute);
              }
              let masterBlob = loadm3u8Master(this.response["sash"]);               
              // let masterSash = loadMasterSash(this.response);
            

              
              let Hls = window.Hls;  

              let _player = document.getElementById(id_v);
              let dashjs = window.dashjs
              console.log({dashjs})
              if(false && dashjs){
                var _url = dashMPD()
               
                // chrome-extension://hlalpgbimjgbobcbpfdhidnhhiigjnlj/index.html#https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s-fmp4/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8
  
                // _url = "https://raw.githubusercontent.com/hectoricardom/hectoricardom.github.io/master/data/hhh.mpd"
                // _url = "http://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd"
                // _url = "https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd"
  
               
                var player = dashjs.MediaPlayer().create();
  
                player.initialize(_player, _url, true);  
                window.dashHLM = player;
              }

              if( Hls && _player){
                let hls = new Hls();
                window._hlsHRM = hls;
                hls.loadSource(masterBlob);
                hls.attachMedia(_player);
                if(_tid){
                  CloseToast(dispatch,{id:_tid})     
                }
             
                var playPromise = _player.play();

                if (playPromise !== undefined) {
                  playPromise.then(_ => {                    
                    _Util.updPlayerStore("requestNext",false);
                    _Util.updPlayerStore("duration",_player.duration);
                    _Util.updPlayerStore("isplaying",true);
                  })
                  .catch(error => {
                  //console.log(error)
                  });
                }
              
                hls.on(Hls.Events.MANIFEST_PARSED, function() {            
                  //_player.play();
                });

                hls.on(Hls.Events.ERROR, (e,data) => {
                // console.log({e}) 
                // console.log({data}) 
                });
                hls.on(Hls.Events.FRAG_LOADED, function(e,data) {
                // console.log({e}) 
                //  console.log({data}) 
                });
                //updKV('audio_list',hls.audioTrackController.tracks);
                //updKV('subtitle_list',hls.subtitleTrackController.tracks);
              
              }
            }
            else{             
              let data = {
                text:"No se encontraron pistas en el video"
              }
              if(_tid){
                CloseToast(dispatch,{id:_tid})     
              }    
              OpenToast(dispatch,data)
              state["route_history"].push({pathname:`/ftp`,search:`` });
            }
          }
        }
      }             
    };  
  xhr.send(); 
}








export const loadHLSdata = (url, dispatch, updKV, keys) => {
  var xhr = new XMLHttpRequest();
    xhr.open( "GET", url, true );
    xhr.responseType = "json";
    xhr.onload = function( e ) {
      if (xhr.status === 200) {          
        var param = url.split('/').pop();
        var IdV = param.split('.')[0];          
        var j = _Util.DecryptAES(this.response.data,IdV);          
        if(_Util.isJson(j)){              
            var _data = JSON.parse(j);




            var _master = _data.hls.hls;  
            let _tracks = _data.hls.tracks;
            _Util.ObjectKeys(_tracks).map((trk)=>{         
              let base64Track = _Util.Base64.encode(_tracks[trk]);  
              let arrayBufferView = base64ToArrayBuffer(base64Track);
              let blob = new Blob( [ arrayBufferView ], { type: 'text/plain' } );
              let urlCreator = window.URL || window.webkitURL;
              let blobUrl = urlCreator.createObjectURL(blob);
              if(_master.indexOf(trk)>0){
                _master = _master.replace(trk,blobUrl);
              }  
                       
            })    
            let base64Track = _Util.Base64.encode(_master);  
            let arrayBufferView = base64ToArrayBuffer(base64Track);
                      
            let blob = new Blob( [ arrayBufferView ], { type: 'text/plain' } );
            let urlCreator = window.URL || window.webkitURL;
            let blobUrlMaster = urlCreator.createObjectURL(blob);
         
            let base64DASH = _Util.Base64.encode(_data.dash);  
            let arrayBufferdash = base64ToArrayBuffer(base64DASH);
                      
            let blobDash = new Blob( [ arrayBufferdash ], { type: 'text/plain' } );
            let urlCreatorDash = window.URL || window.webkitURL;
            let blobUrlDash = urlCreatorDash.createObjectURL(blobDash);

            dispatch({
              type: 'UPD_KEY_VALUE',
              kv:{key:'UrlDash',value:blobUrlDash}
            })

            window.UrlDash =blobUrlDash;
            
            dispatch({
              type: 'UPD_KEY_VALUE',
              kv:{key:'UrlHlm',value:null}
            })

            var ThmbnailUrl = url.replace('hlm','bif');            
            dispatch({
              type: 'UPD_KEY_VALUE',
              kv:{key:'thumbnailJsonUrl',value:ThmbnailUrl}
            })

            let IdVideo = keys[95];

            let id_v = `${IdVideo}_video`;
            let _player = document.getElementById(id_v)
            let Hls = window.Hls;  
            /* 
            let dashjs = window.dashjs
            if(dashjs){
              var _url = blobUrlDash;

              // chrome-extension://hlalpgbimjgbobcbpfdhidnhhiigjnlj/index.html#https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s-fmp4/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8

              // _url = "https://raw.githubusercontent.com/hectoricardom/hectoricardom.github.io/master/data/hhh.mpd"
              // _url = "http://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd"
              // _url = "https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd"

              _url = http://localhost:7070/Stream9/HuX5bhPVTPQF3fnA.mpd
              
              var player = dashjs.MediaPlayer().create();

              player.initialize(_player, _url, true);  
              window.dashHLM = player;
            }
        

          
            if(Hls){
              let hls = new Hls();
              window._hlsHRM = hls;
              hls.loadSource("http://localhost:7070/Stream2HRM/7zS8mtL8VqPF3AO2.m3u8");
              hls.attachMedia(_player);
              var playPromise = _player.play();

              if (playPromise !== undefined) {
                playPromise.then(_ => {
                })
                .catch(error => {
                 console.log(error)
                });
              }
              updKV('loadedVideo',true);
             
              //  http://localhost:7070/Stream2HRM/7zS8mtL8VqPF3AO2.m3u8
              //setLoaded(true);
            }
            
          



            var _progressThumbnail = window.HrmPlayer && window.HrmPlayer.config && window.HrmPlayer.config.progressThumbnail;
            dispatch({
              type: 'UPD_KEY_VALUE',
              kv:{key:'progressThumbnail',value:_progressThumbnail}
            })
      






            setTimeout(()=>{
            //updState('audio_list',hls.audioTrackController.tracks);
            // updState('subtitle_list',hls.subtitleTrackController.tracks);
            },1500) 
        }
      }             
    };  
  xhr.send(); 
}


*/





 export function makeFileRequest(url,parmas, file,formName,videoRef){ 
    let formData = new FormData(),
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    //for (let i = 0; i < files.length; i++) {}
    formData.append("file", file, file.name);
    

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              if(_Util.isJson(xhr.response)){
                var data = JSON.parse(xhr.response)
                if(data && data.id){               
                  /*
                  dispatch(UpdateForm(formName,'isPlayable',true));   
                  dispatch(UpdateForm(formName,'code',data.id));
                  dispatch(UpdKeyValue({key:'uploadVideoDone',value:true}));
                  dispatch(getVideoById(videoRef));
                  */
                } 
              }
                            
            } else {
              console.log(`error`);
              console.log(xhr.response);
            }
        }
    };

    xhr.upload.onprogress = (event) => {
        //let progress = Math.round(event.loaded / event.total * 100);
        //dispatch(UpdKeyValue({key:'uploadProgress',value:progress}));
        //this.props.commonStore.UploadList[file.name][`progress`] = progress;
        //this.props.commonStore.UploadProgress()
      
    };

    xhr.open('POST', url, true);     
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("autorization", "e7d278c5-d443-aa4c-a001-8ebd9bbb9073");
    xhr.send(formData);
    //this.props.commonStore.UploadList[file.name][`xhr`] = xhr; 
  
}









export function SrtCaching(url, id, dispatch) {
    const state = _Util.getPlayerStore();
    var _subtitles = state.subtitle;
    _subtitles[id] = {}
    var xhr = new XMLHttpRequest();    
          xhr.open( "GET",url , true );
          xhr.responseType = "text";
          xhr.onload = function( e ) {
            if (xhr.status === 200) {
              _subtitles[id]['srt']=srt2Json(this.responseText);  
              _Util.updPlayerStore("subtitle",_subtitles)
              _Util.updPlayerStore("subtitleId",id)
              dispatch({
                type: 'UPD_KEY_VALUE',
                kv:{key:'observePlayer',value:_Util.gen12CodeId()}
              })          
            }             
          };  
    xhr.send();
}  



export function updSecSyncTime(sec,dispatch) {
  _Util.updPlayerStore("subtitleSyncTime",sec)  
}







export function updTimebyVideoId(doc){
    let _now = (new Date()).getTime();    
    var _url = _Util.get_GRAPHQLURL(); 
    const query= `
    mutation($doc: UpdateBookmarkPosition!){
      payload:  updateBookmarkPosition(bookmark: $doc) {
        id,
        started,
        completed,
        timeline,
        duration,
        videoId      
      }
    }  
    `;
    let variables={doc};
    _url && _Util.fetchGraphQL(_url,{query,variables}) 
    .then(res => {
       //var b = res.data
      // let dur = (new Date()).getTime() - _now;            
      // let bytePerMls =  Math.floor((14/dur)*1000) ;
      // window.bandWidthPerSecond = bytePerMls*10;
       //console.log(b)           
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };







  




  export  function srt2Json(srt) {
    //srt = srt.replace(/[^a-zA-Z0-9]/g, '');
    //console.log(srt)
    ///console.log(unescape( encodeURIComponent( srt )));
    srt = srt.replace(/(\r\n|\n|\r)/gm,"&*^");
    var SrtL=[],nObjSrt = {id:null,start:null,end:null,startSt:null,endSt:null,text:''};
    srt.split('&*^').map(f=>{
        if(isNaN(f)){
            if(f.indexOf('-->')>3){
                nObjSrt.start = time2number(f.split('-->')[0]);
                nObjSrt.end = time2number(f.split('-->')[1]);
                nObjSrt.startSt = (f.split('-->')[0]);
                nObjSrt.endSt = (f.split('-->')[1]);
            }
            else if(f.indexOf('->')>3){
              nObjSrt.start = time2number(f.split('->')[0]);
              nObjSrt.end = time2number(f.split('->')[1]);
              nObjSrt.startSt = (f.split('->')[0]);
              nObjSrt.endSt = (f.split('->')[1]);
          }
            else{
                nObjSrt.text += f+'\n'; 
            }  
        }
        else{
            if(f===''){               
                if(nObjSrt.id){
                    SrtL.push(nObjSrt);
                }
                nObjSrt = {id:null,start:null,end:null,startSt:null,endSt:null,text:''};
            }
            else{
                nObjSrt.id = parseInt(f);
            }
        }        
    })    
    return SrtL
  }

  
  
  function time2number(s){
    var tm = s.split(':'),num = 0;
    if(tm.length>2){
        num = parseFloat(tm[0])*3600+parseFloat(tm[1])*60+parseFloat(tm[2])        
    }
    else{
        num = parseFloat(tm[1])*60+parseFloat(tm[2])
    }
    return num;
  }
  



  function getThumbnail(url,dispatch) {    
      var xhr = new XMLHttpRequest();    
        xhr.open( "GET",url , true );
        xhr.responseType = "json";        
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {           
            //document.getElementById("demo").innerHTML = this.responseText;
          }
        };
        xhr.onload = function( e ) {          
          if (xhr.status === 200) {
            if(this.response && this.response.data){              
              _Util.updPlayerStore("thumbnailJsonValid",true);
              const state = _Util.getPlayerStore();
              var _thumbnailJson = state['thumbnailJson'] || {};
              _Util.ObjectKeys(this.response.data).map(rtt=>{
                _thumbnailJson[rtt]=this.response.data[rtt];
              })
              _Util.updPlayerStore("thumbnailJson",_thumbnailJson)  
              _Util.updPlayerStore("thumbnailJsonUrl",url.split('?')[0])               
              var yIndex = state['thumbnailJsonIndex'] || {};
              if(yIndex){
                yIndex[0]=true;                
                _Util.updPlayerStore("thumbnailJsonIndex",yIndex)   
              } 
              dispatch({
                type: 'UPD_KEY_VALUE',
                kv:{key:'observePlayer',value:_Util.gen12CodeId()}
              })
            }
          }
        };
      xhr.send(); 
  }





  

  export function getThumbnailbyTime(d, dispatch){
      const state = _Util.getPlayerStore();
      const {thumbnailJson, thumbnailBlob, thumbnailJsonUrl, thumbnailJsonValid, progressThumbnail} = state; 
      let _thumbnailJsonValid = thumbnailJsonValid || true;
      var blb = thumbnailBlob || {};
      if(_thumbnailJsonValid && thumbnailJson && thumbnailJson[d] && !blb[d]){
        blb[d]=getBlob(thumbnailJson[d]);
        _Util.updPlayerStore("thumbnailBlob",blb)   
      }
      if(_thumbnailJsonValid && thumbnailJson && !thumbnailJson[d]){
        let Nindex = Math.floor(d/10)
        var _url = `${thumbnailJsonUrl}?init=${Nindex}`;        
        var yIndex = state['thumbnailJsonIndex'] || {};
        if(yIndex && !yIndex[Nindex]){
          if(progressThumbnail){
            getThumbnail(_url,dispatch,state);  
          }      
          yIndex[Nindex]=true;          
          _Util.updPlayerStore("thumbnailJsonIndex",yIndex)
          dispatch({
            type: 'UPD_KEY_VALUE',
            kv:{key:'observePlayer',value:_Util.gen12CodeId()}
          })
        }
      }
      return blb[d];    
  }
  



  export function SrtCachingFile(url,id, dispatch) {
    const state = _Util.getPlayerStore()
    let srt = url.replace(/: /gi,":");
    srt = srt.replace(/(\r\n|\n|\r)/gm,"&*^");
      var _subtitles = state.subtitle || {};
      _subtitles[id] = {}
      _subtitles[id]['srt']=srt2Json(srt);       
      _Util.updPlayerStore("subtitle",_subtitles)
      _Util.updPlayerStore("subtitleId",id)
      dispatch({
        type: 'UPD_KEY_VALUE',
        kv:{key:'observePlayer',value:_Util.gen12CodeId()}
      })
  }




  

  function getBlob(t){    
    var arrayBufferView = base64ToArrayBuffer(t);
    //Util.DecodeWebp(arrayBufferView);       
    var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(blob);     
    return imageUrl;
  }




  
  function base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  




/*

Jan/03/20 - Jul/09/20 :   4569

Jul/16/19 - Dec/31/19 :  1730

6300


*/