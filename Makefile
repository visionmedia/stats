
TESTS = $(shell find test -name "*.js")

test:
	@./test/run

.PHONY: test $(TESTS)