# ust2json
Convert UTAU Sequence Text and JSON to each other. 

UST情報(UTAU)とJSONを相互変換します。

WEB開発の感覚でUTAUを編集できたらなーと思って作りました。

詳細なドキュメントはそのうちつくります。

# Install
```
git clone https://github.com/katai5plate/ust2json
```

# memo: SESSION
- VERSION
- SETTING
- PREV
- 0000 : 数字の意味はなく、順序を評価
- ( INSERT : 数字の間 )
- ( DELETE : 数字の代わり )
- NEXT
- < TRACKEND >

# memo: jsAPI
## JSON文字列がある状態で実行するとテキストエリアに反映

### 歌詞がすべて「あ」になる。
mapNumを使うことで数字セッションの一括処理ができる。
```js
U2J.send(U2J.mapNums(U2J.jget(),v=>{v.Lyric="あ"}));
```

### プラマイ１２音階ランダムでずらす
```js
U2J.send(U2J.mapNums(U2J.jget(),v=>{v.NoteNum+=((Math.random()*24)-12)>>0}));
```

### エンベロープ情報を追記する
配列ではなく文字列。
```js
U2J.send(U2J.mapNums(U2J.jget(),v=>{v.Envelope="0,20,146,0,181,97,0"}));
```

### エンベロープ情報を分析する
aggreNumsで数字セッションの分析ができる
```js
var data = U2J.aggreNums(U2J.jget());
```
このJSONをクリップボードにコピーする
```js
U2J.clip(JSON.stringify(U2J.aggreNums(U2J.jget())));
```

### ニュアンスをコピーする
1. まず参考にしたいUSTファイルをメモ帳か何かで開きテキストエリアにコピペする
2. 「UST to JSON」を押す
3. コンソールを開き、以下を実行
```js
var data = U2J.aggreNums(U2J.jget());
```
4. ニュアンスコピーしたいUSTファイルをメモ帳か何かで開きテキストエリアにコピペする
5. 「UST to JSON」を押す
6. コンソールで以下を実行する
```js
U2J.send(U2J.mapNums(U2J.jget(),v=>{
    Object.keys(data).forEach(l=>{
        if(v.Lyric==l){
            v.PreUtterance=data[l].preu.avr;
            v.VoiceOverlap=data[l].overlap.avr;
            v.Intensity=data[l].intensity.avr;
            v.Moduration=data[l].mod.avr;
            v.StartPoint=data[l].stp.avr;
            v.Envelope=data[l].env.avr?data[l].env.avr.text:"";
            v.Velocity=data[l].velocity.avr||100;
            v.VBR=data[l].pit.avr?data[l].pit.avr.vbr.text:"";
            v.PBType=5;
            delete v.Pitches;
            v.Piches=data[l].pit.avr?data[l].pit.avr.pich.join(","):"";
        }
    })
}));
```
7. 「JSON to UST」を押す
8. ニュアンスコピーしたいUSTファイルに、テキストエリアの内容を完全に上書きする
9. USTファイルをUTAUで開き、エンベロープの[!]を直す（プラグイン推奨）
10. ニュアンスコピー完了！


#### 分析情報の内訳
|構成|内容|
|:-|:-|
|歌詞|文字が入る。連続音なら"o と"みたいに入る。|
|　＋－leng|音符の長さ[1～7680Tick]>0|
|　＋－note|音階番号[24～107]>24|
|　＋－preu|先行音声[～60000ms]>""|
|　＋－overlap|オーバーラップ[～60000ms]>""|
|　＋－intensity|強さ[0～200]>""=100|
|　＋－mod|モジュレーション[-200～200％]>""=100|
|　＋－stp|スタートポイント[ms]>""=0|
|　＋－env|エンベロープ|
|　｜　＋－p1|[]>0|
|　｜　＋－p2|[]>5|
|　｜　＋－p3|[]>35|
|　｜　＋－v1|[0～200]>0|
|　｜　＋－v2|[0～200]>100|
|　｜　＋－v3|[0～200]>100|
|　｜　＋－v4|[0～200]>0|
|　｜　＋－p4|[]>0|
|　｜　＋－v5|[0～200]>10|
|　｜　＼－p5|[]>100|
|　＋－velocity|子音速度[0～200]>100|
|　＼－pit|ピッチベンド|
|　　　＋－type|ピッチベンドタイプ[5/OldData]>5|
|　　　＋－pich|ピッチ(配列)[-2048～2047cent]>0|
|　　　＋－pbs|ピッチ曲線の最初の点(;区切)[-200～200ms;-204.8～204.7cent*10]>0|
|　　　＋－pbw|ピッチポイント間隔(配列)[実数ms]>""|
|　　　＋－pby|pbs以外のピッチポイントシフト値(配列)[-204.8～204.7cent*10]>0|
|　　　＋－pbm|ピッチ曲線の形(配列)[""/s/r/j]>""|
|　　　＼－vbr|ビブラート|
|　　　　　＋－leng|音符の長さに対する長さ[0.0～100.0％]>65|
|　　　　　＋－freq|周期[64～512ms]>180|
|　　　　　＋－cent|深さ[5～200cent]>35|
|　　　　　＋－from|入[0～100％]>20|
|　　　　　＋－to|出[0～100％]>20|
|　　　　　＋－phase|位相[0～100％]>0|
|　　　　　＼－height|高さ[0～100％]>0|

