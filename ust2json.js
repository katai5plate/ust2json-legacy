function toJSON() {
    try{
        const s = document.getElementById("source");
        const t = s.value;
        const a = t.split("\n");
        let j = {};
        let clname = "";
        for (var i = 0; i < a.length; i++) {
            var v = a[i];
            if (!!v.match(/\[#([A-Z0-9]+)\]/)) {
                clname = v.replace(/\[#([A-Z0-9]+)\]/g, '$1');
                clname = isNaN(clname) ? clname : Number(clname);
                j[clname] = {};
            } else if (v.indexOf("=") > -1) {
                if (j[clname]["param"] == null) j[clname]["param"] = {};
                var p = v.split("=");
                var c = p[1] == "" ? null :
                    !isNaN(p[1]) ? Number(p[1]) : p[1];
                j[clname]["param"][p[0]] = c;
            } else {
                if (v != "") {
                    if (j[clname]["meta"] == null) j[clname]["meta"] = [];
                    j[clname]["meta"].push(v);
                }
            }
        }
        s.value = JSON.stringify(j);
        console.log("-- OUTPUT --");
        console.log(j);
        console.log("------------");
    }catch(e){
        alert(`2json:\n${e.message}`);
    }
}
function toUST() {
    try{
        const s = document.getElementById("source");
        const t = s.value;
        const a = JSON.parse(t);
        const l = ["VERSION","SETTING","PREV","n","INSERT","DELETE","NEXT","TRACKEND"];
        const nlp = (v)=>v==null?"":v;
        const z4 = (v)=>`0000${v}`.slice(-4);
        let o = "";
        l.forEach(k=>{
            if(a[k]!=null){
                o+=`[#${k}]\n`;
                if(a[k].param!=null){
                    Object.keys(a[k].param).forEach(kk=>{
                        o+=`${kk}=${nlp(a[k].param[kk])}\n`;
                    });
                }
                if(a[k].meta!=null){
                    Object.keys(a[k].meta).forEach(kk=>{
                        o+=`${nlp(a[k].meta[kk])}\n`;
                    });
                }
            }else if(k=="n"){
                Object.keys(a).filter(v=>!isNaN(v)).forEach(kk=>{
                    o+=`[#${z4(kk)}]\n`;
                    if(a[kk].param!=null){
                        Object.keys(a[kk].param).forEach(kkk=>{
                            o+=`${kkk}=${nlp(a[kk].param[kkk])}\n`;
                        });
                    }
                    if(a[kk].meta!=null){
                        Object.keys(a[kk].meta).forEach(kkk=>{
                            o+=`${nlp(a[kk].meta[kkk])}\n`;
                        });
                    }
                });
            }
        });
        s.value = o;
    }catch(e){
        alert(`2ust:\n${e.message}`);
    }
}

var U2J = U2J || {
    toJSON:function(t) {
        try{
            const a = t.split("\n");
            let j = {};
            let clname = "";
            for (var i = 0; i < a.length; i++) {
                var v = a[i];
                if (!!v.match(/\[#([A-Z0-9]+)\]/)) {
                    clname = v.replace(/\[#([A-Z0-9]+)\]/g, '$1');
                    clname = isNaN(clname) ? clname : Number(clname);
                    j[clname] = {};
                } else if (v.indexOf("=") > -1) {
                    if (j[clname]["param"] == null) j[clname]["param"] = {};
                    var p = v.split("=");
                    var c = p[1] == "" ? null :
                        !isNaN(p[1]) ? Number(p[1]) : p[1];
                    j[clname]["param"][p[0]] = c;
                } else {
                    if (v != "") {
                        if (j[clname]["meta"] == null) j[clname]["meta"] = [];
                        j[clname]["meta"].push(v);
                    }
                }
            }
            return {data:j,text:JSON.stringify(j)};
        }catch(e){
            alert(`2json:\n${e.message}`);
        }
    },
    toUST:function(t) {
        try{
            const a = typeof(t)!="object"?JSON.parse(t):t;
            const l = ["VERSION","SETTING","PREV","n","INSERT","DELETE","NEXT","TRACKEND"];
            const nlp = (v)=>v==null?"":v;
            const z4 = (v)=>`0000${v}`.slice(-4);
            let o = "";
            l.forEach(k=>{
                if(a[k]!=null){
                    o+=`[#${k}]\n`;
                    if(a[k].param!=null){
                        Object.keys(a[k].param).forEach(kk=>{
                            o+=`${kk}=${nlp(a[k].param[kk])}\n`;
                        });
                    }
                    if(a[k].meta!=null){
                        Object.keys(a[k].meta).forEach(kk=>{
                            o+=`${nlp(a[k].meta[kk])}\n`;
                        });
                    }
                }else if(k=="n"){
                    Object.keys(a).filter(v=>!isNaN(v)).forEach(kk=>{
                        o+=`[#${z4(kk)}]\n`;
                        if(a[kk].param!=null){
                            Object.keys(a[kk].param).forEach(kkk=>{
                                o+=`${kkk}=${nlp(a[kk].param[kkk])}\n`;
                            });
                        }
                        if(a[kk].meta!=null){
                            Object.keys(a[kk].meta).forEach(kkk=>{
                                o+=`${nlp(a[kk].meta[kkk])}\n`;
                            });
                        }
                    });
                }
            });
            return o;
        }catch(e){
            alert(`2ust:\n${e.message}`);
        }
    },
    toJSONFromTa:function() {
        try{
            const s = document.getElementById("source");
            const o = this.toJSON(s.value);
            s.value = o.text;
        }catch(e){
            console.error("toJSONFromTa failed");
        }
    },
    toUSTFromTa:function() {
        try{
            const s = document.getElementById("source");
            const o = this.toUST(s.value);
            s.value = o;
        }catch(e){
            console.error("toUSTFromTa failed");
        }
    },
    get:function(){
        return document.getElementById("source").value;
    },
    jget:function(){
        return JSON.parse(this.get());
    },
    clip:function(x){
        if(x==null){
            x=this.get();
        }
        let t = document.createElement('div');
        t.appendChild(document.createElement('pre')).textContent = x;
        document.body.appendChild(t);
        document.getSelection().selectAllChildren(t);
        document.execCommand('copy');
        document.body.removeChild(t);
        console.log("-- COPIED --");
    },
    send:function(x){
        document.getElementById("source").value = typeof(x)=="object" ? JSON.stringify(x) : x;
    },
    mapNums:function(data,mapf){
        Object.keys(data).filter(v=>!isNaN(v)).forEach((v,i)=>{
            mapf(data[i].param)
        });
        return data;
    },
    aggreNums:function(data){
        let out = [];
        U2J.mapNums(data,v=>{
            //if(v.Envelope){
                const env = v.Envelope ? v.Envelope.split(",") : [];
                const vbr = v.VBR ? v.VBR.split(",") : [];
                out.push({
                    lyric: v.Lyric,
                    leng: v.Length || null,
                    note: v.NoteNum || null,
                    preu: v.PreUtterance || null,
                    overlap: v.VoiceOverlap || null,
                    intensity: v.Intensity || null,
                    mod: v.Moduration || null,
                    stp: v.StartPoint || v.STP || null,
                    env:{
                        text:v.Envelope || null,
                        p1:env[0] ? Number(env[0]) : null,
                        p2:env[1] ? Number(env[1]) : null,
                        p3:env[2] ? Number(env[2]) : null,
                        v1:env[3] ? Number(env[3]) : null,
                        v2:env[4] ? Number(env[4]) : null,
                        v3:env[5] ? Number(env[5]) : null,
                        v4:env[6] ? Number(env[6]) : null,
                        p4:env[8] ? Number(env[8]) : null,
                        p5:env[9] ? Number(env[9]) : null,
                        v5:env[10] ? Number(env[10]) : null,
                    },
                    velocity: v.Velocity || null,
                    label: v.Label || null,
                    pit:{
                        type: v.PBType || null,
                        pich: v.Pitches ? v.Pitches.split(",").map(w=>Number(w)>>0) :
                              v.Piches ? v.Piches.split(",").map(w=>Number(w)>>0) : null,
                        pbs: v.PBS || null,
                        pbw: v.PBW || null,
                        pby: v.PBY || null,
                        pbm: v.PBM || null,
                        vbr:{
                            text:v.VBR || null,
                            leng:vbr[0] ? Number(vbr[0]) : null,
                            freq:vbr[1] ? Number(vbr[1]) : null,
                            cent:vbr[2] ? Number(vbr[2]) : null,
                            from:vbr[3] ? Number(vbr[3]) : null,
                            to:vbr[4] ? Number(vbr[4]) : null,
                            phase:vbr[5] ? Number(vbr[5]) : null,
                            height:vbr[6] ? Number(vbr[6]) : null,
                            meta:vbr[7] ? Number(vbr[7]) : null,
                        }
                    },
                });
            //}
        })
        out = out.sort((a,b)=>{
            a = a.lyric; b = b.lyric;
            return a<b ? -1 : a>b ? 1 : 0;
        });
        let oprev = {};
        for(const ocrr of out){
            if(oprev[ocrr.lyric]==null) oprev[ocrr.lyric]={};
            const label = ["leng","note","preu","overlap","intensity","mod","stp","env","velocity","pit",];
            const lenv = ["p1","p2","p3","v1","v2","v3","v4","p4","v5","p5","text"];
            const eret = {p1:0,p2:0,p3:0,v1:0,v2:0,v3:0,v4:0,p4:0,v5:0,p5:0,text:""};
            const lpit = ["type","pich","pbs","pbw","pby","pbm","vbr"];
            const pret = {type:0,pich:[],pbs:"",pbw:"",pby:"",pbm:"",vbr:{}};
            const lpit2 = ["leng","freq","cent","from","to","phase","height","text"];
            const pret2 = {leng:0,freq:0,cent:0,from:0,to:0,phase:0,height:0,text:""};
            for(let pindex=0;pindex<label.length;pindex++){
                const pkey = label[pindex];
                let current = oprev[ocrr.lyric][pkey];
                let ret = {};
                if(current){
                    current["value"].push(ocrr[pkey]);
                    if(pkey=="env"){
                        ret = eret;
                        for(const index in current["value"]){
                            for(const key of lenv){
                                if(key!="text"){
                                    ret[key]+=current["value"][index][key]||0;
                                    if(index==current["value"].length-1){
                                        ret[key]/=current["value"].length;
                                        ret[key]=ret[key]>>0;
                                    }
                                }else{
                                    ret[key]=`${ret.p1},${ret.p2},${ret.p3},${ret.v1},${ret.v2},${ret.v3},${ret.v4},${ret.p4},${ret.v5},${ret.p5}`;
                                }
                            }
                        }
                        current["avr"] = ret;
                    }else if(pkey=="pit"){
                        // ピッチ
                        ret = pret;
                        for(const index in current["value"]){
                            for(const key of lpit){
                                if(key!="pich"){
                                    ret[key]+=current["value"][index][key]||0;
                                    if(index==current["value"].length-1){
                                        ret[key]/=current["value"].length;
                                        ret[key]=ret[key]>>0;
                                    }
                                }else{
                                    for(const pti in current["value"][index][key]){
                                        ret[key][pti]= !ret[key][pti] ?
                                                       current["value"][index][key][pti] :
                                                       ret[key][pti]+(current["value"][index][key][pti]||0);
                                    }
                                }
                            }
                        }
                        ret.pich = ret.pich.reduce((ptp,ptpc,ptpi)=>{
                            ptp[ptpi]/=current["value"].length;
                            ptp[ptpi]=ptp[ptpi]>>0
                            return ptp;
                        },ret.pich);
                        current["avr"] = ret;
                        // ビブラート
                        ret = pret2;
                        for(const index in current["value"]){
                            for(const key of lpit2){
                                if(key!="text"){
                                    ret[key]+=current["value"][index][key]||0;
                                    if(index==current["value"].length-1){
                                        ret[key]/=current["value"].length;
                                        ret[key]=ret[key]>>0;
                                    }
                                }else{
                                    ret[key]=`${ret.leng},${ret.freq},${ret.cent},${ret.from},${ret.to},${ret.phase},${ret.height}`;
                                }
                            }
                        }
                        current["avr"].vbr = ret;
                    }else{
                        if(!this.arrIsAllNull(current["value"])){
                            current["avr"] = current.value.reduce((p,c)=>p+(c||0));
                            current["avr"] /= current.value.length;
                            current["avr"] = current["avr"]>>0;
                        }else{
                            current["avr"] = null;
                        }
                    }
                }else{
                    oprev[ocrr.lyric][pkey]={
                        value:[],
                        avr:null,
                    };
                }
            }
        }
        return oprev;
    },
    arrIsAllNull:function(x){
        return x.reduce((p,c)=>{return c==null?p-1:p;},x.length)==0;
    },
    knDtct:function(char){
        //連続音判定："o の".match(/[aiueo]\s/)
        const vow=[
            {name:"a",list:["あ","か","さ","た","な","は","ま","や","ら","わ","が","ざ","だ","ば","ぱ","ぁ","ゎ","ゃ"]},
            {name:"i",list:["い","き","し","ち","に","ひ","み","り","ぎ","じ","ぢ","び","ぴ","ぃ"]},
            {name:"u",list:["う","く","す","つ","ぬ","ふ","む","ゆ","る","ぐ","ず","づ","ぶ","ぷ","ゔ","ぅ","ゅ"]},
            {name:"e",list:["え","け","せ","て","ね","へ","め","れ","げ","ぜ","で","べ","ぺ","ぇ"]},
            {name:"o",list:["お","こ","そ","と","の","ほ","も","よ","ろ","を","ご","ぞ","ど","ぼ","ぽ","きょ","ぎょ","しょ","ちょ","ぢょ","にょ","ひょ","びょ","ぴょ","みょ","りょ","ぉ","ょ"]},
            {name:"n",list:["ん"]},
        ]
        const cons=[
            {name:"k",list:["か","き","く","け","こ"]},
            {name:"s",list:["さ","し","す","せ","そ"]},
            {name:"t",list:["た","ち","つ","て","と"]},
            {name:"n",list:["な","に","ぬ","ね","の"]},
            {name:"h",list:["は","ひ","ふ","へ","ほ"]},
            {name:"m",list:["ま","み","む","め","も"]},
            {name:"y",list:["や","ゆ","よ"]},
            {name:"r",list:["ら","り","る","れ","ろ"]},
            {name:"w",list:["わ","を"]},
            {name:"g",list:["が","ぎ","ぐ","げ","ご"]},
            {name:"z",list:["ざ","じ","ず","ぜ","ぞ"]},
            {name:"d",list:["だ","ぢ","づ","で","ど"]},
            {name:"b",list:["ば","び","ぶ","べ","ぼ","ゔ"]},
            {name:"p",list:["ぱ","ぴ","ぷ","ぺ","ぽ"]},
        ];
        let r={head:{vow:null,cons:null},foot:{vow:null,cons:null}};
        vow.forEach(v=>{
            v.list.forEach(vv=>{
                if(vv==char.substr(0,1)){
                    r.head.vow=v.name;
                }
                if(vv==char.substr(-1,1)){
                    r.foot.vow=v.name;
                }
            });
        })
        cons.forEach(v=>{
            v.list.forEach(vv=>{
                if(vv==char.substr(0,1)){
                    r.head.cons=v.name;
                }
                if(vv==char.substr(-1,1)){
                    r.foot.cons=v.name;
                }
            });
        })
        return r;
    }
};

if(false){
    U2J.send(U2J.mapNums(U2J.jget(),(v,p)=>{
        if(p!=null){
            if(p.Lyric=="R"){
                v.Lyric=`- ${v.Lyric}`;
            }else{
                console.log(U2J.knDtct(p.Lyric).head);
                v.Lyric=`${U2J.knDtct(p.Lyric).head.vow} ${v.Lyric}`;
            }
        }else{
            v.Lyric=`- ${v.Lyric}`;
        }
    }));
}