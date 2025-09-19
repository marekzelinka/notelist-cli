# A small CLI note taking tool

This is a small CLI tool for note taking in terminal.
You can manage (create/remove/list) notes via this tool on terminal.

## Usage

"Install" the cli:

```sh
git clone https://github.com/marekzelinka/notelist-cli
cd notelist-cli
pnpm lint
```

Now, you can use it like so:

```sh
note <command>
```

Example:

```sh
note new "'let' is scoped to a block" 
```

Example with tags:

```sh
note new "TypeScript adds static typing to JavaScript" --tags JavaScript,TypeScript
```

## Roadmap - in no particular order

- Fix tests!!!
- Export function
- Add, remove tags to existing notes
- Move starred notes to the top
- Add terminal coloring
- Make CLI into a NPM package, publish it so users can install it
- Store database json file in root (~/.notedb.json)
- Parse database file, if fail remove and create a new one

## Credits

- [Intro to Node v3](https://github.com/Hendrixer/intro-node-v3/tree/main)
- [jotr](https://github.com/hakash/jotr)
- [notes-cli](https://github.com/rhysd/notes-cli/tree/master)