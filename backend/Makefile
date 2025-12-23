folder:
	#create a folder for the project
	@nest g module $(name)
	@nest g controller $(name)
	@nest g service $(name)

start:
	@yarn start:dev

# Check migration status
show:
	@yarn migration:show

# Revert if needed
revert:
	@yarn migration:revert

# Fix the migration file and run again
run:
	@yarn migration:run

build:
	@yarn build

test:
	@yarn test
