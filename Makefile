check:
	./tools/check.js
install:
	yarn install && ./tools/install.js
update:
	./tools/update.js "3.0.0-beta.0"
publish:
	./tools/publish.js
pack:
	rm -f frontpack.zip && zip -r frontpack.zip ./ -x node_modules/\* .git/\* tools/\* example/\* .idea/\* preset/*/node_modules/\* Makefile *.DS_Store
clean:
	find . -name "node_modules" -exec rm -rf '{}' +
