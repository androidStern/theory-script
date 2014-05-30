{map,filter,lines,is-type,all,Str,elem-index} = require 'prelude-ls'

in-c = -> it in <[C D E F G A B]>
is-acc = -> it in <[# b]>



toMajScale    = (note)-> keys(withoutNum(note))
cOffset       = (note)-> elem-index c_Maj, baseNote(note)
