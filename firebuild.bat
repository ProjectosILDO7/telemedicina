del deploy\public /y
md deploy\public
xcopy dist\*.* /s /y deploy\public
cd deploy
firebase deploy
cd..