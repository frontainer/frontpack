check:
	./tools/check.js
install:
	yarn install && ./tools/install.js
publish:
	./tools/publish.js patch
pack:
	rm -f frontpack.zip && zip -r frontpack.zip ./ -x node_modules/\* .git/\* tools/\* example/\* .idea/\* preset/*/node_modules/\* Makefile *.DS_Store
clean:
	find . -name "node_modules" -exec rm -rf '{}' +
