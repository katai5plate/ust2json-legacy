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

/*
[#VERSION]
[#SETTING]
[#PREV]
[#0000]:数字の意味はなく、順序を評価
([#INSERT]:数字の間)
([#DELETE]:数字の代わり)
[#NEXT]
<[#TRACKEND]>
*/