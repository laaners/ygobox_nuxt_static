mkdir %~n1
backgroundremover -i %1 -o "%~n1\zz_0.png"
backgroundremover -i %1 -a -ae 0 -o "%~n1\zz_1.png"
backgroundremover -i %1 -a -ae 15 -o "%~n1\zz_2.png"
backgroundremover -i %1 -a -ae 25 -o "%~n1\zz_3.png"
backgroundremover -i %1 -m "u2net_human_seg" -o "%~n1\zz_4.png"
backgroundremover -i %1 -m "u2netp" -o "%~n1\zz_5.png"
backgroundremover -i %1 -m "u2net" -o "%~n1\zz_6.png"