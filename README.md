# ust2json
Convert UTAU Sequence Text and JSON to each other. 

UST情報(UTAU)とJSONを相互変換します。

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
JSON文字列がある状態で・・・

歌詞がすべて「あ」になる。
```
U2J.send(U2J.mapNum(U2J.jget(),v=>{v.Lyric="あ"}));
```

プラマイ１２音階ランダムでずらす
```
U2J.send(U2J.mapNum(U2J.jget(),v=>{v.NoteNum+=((Math.random()*24)-12)>>0}));
```

エンベロープ情報を追記する
```
U2J.send(U2J.mapNum(U2J.jget(),v=>{v.Envelope="0,20,146,0,181,97,0"}));
```