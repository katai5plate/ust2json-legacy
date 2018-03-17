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
    mapNum:function(data,param){
        Object.keys(data).filter(v=>!isNaN(v)).forEach((v,i)=>{param(data[i].param)});
        return data;
    }
};
