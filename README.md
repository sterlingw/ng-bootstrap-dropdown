# ng-bootstrap-dropdown
AngularJS dropdown directive that just works. (requires Bootstrap)

**Note: this package requires angular and bootstrap.**

# Installation
#### Bower
```
bower install ng-bootstrap-dropdown --save
```
#### NPM
```
npm install ng-bootstrap-dropdown --save
```

# Usage
The only required attribute is `options`. For example:
```
<dropdown options="[1, 2, 3]"></dropdown>
```

## Attributes
#### `options`: (required)
Array of options to select from.

#### `selected-model`: (optional)
Two-way bound value referencing the selected option. Updates when a new option is selected.

#### `default-selection`: (optional)
Default text of the dropdown. If omitted, the first option in the `options` array will be selected.

#### `on-select`: (optional)
Callback expression executed when an option is selected, passing the selected `option` as a parameter.

## License
MIT. Copyright (c) [Sterling Whitley](http://sterlingw.com)
