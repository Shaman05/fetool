tar cf fetool.tar app public package.json
gzip fetool.tar
mv fetool.tar.gz fetool.nw
copy /b nw.exe+fetool.nw fetool.exe
mv fetool.exe release/
rm fetool.nw