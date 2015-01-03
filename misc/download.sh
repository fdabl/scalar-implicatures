#! /bin/sh

mkdir -p conditions
url="http://www.sfs.uni-tuebingen.de/~mfranke/MT/K2/"

for i in `seq 1 3`; do
    cond="$url Var0 $i"
    mkdir -p conditions/$i && cd conditions/$i

    for el in "0-0" "0-2" "0-3" "0-6" "1-5" "2-0" "3-0" "3-3" "4-0" "6-0"; do
        img="$el.pdf"
        target=$(echo "$cond/$img" | tr -d ' ')

        curl -Os $target # download image (.pdf)
        convert $img $el.png # convert image to .png
        rm $img
    done

    cd ../..
done
