check:
	./tools/check.js
install:
	./tools/install.js
publish:
	./tools/publish.js
pack:
	zip -r frontpack.zip ./ -x node_modules/\* .git/\* tools/\* example/\* .idea/\* preset/*/node_modules/\* Makefile *.DS_Store

