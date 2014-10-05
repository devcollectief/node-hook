node-hook
=========

github webhook test application

### hook configuration
place a `config.json` file within the hook folder with following content (replacing contents in `{{}}`)

````json
{
	"repo": {
		"name": "node-hook",
		"shurl": "devcollectief/node-hook"
	},
	"mail": {
		"user": "{{gmail username}}",
		"pass": "{{gmail password}}",
		"from": "{{NAME}} <{{EMAIL}}>",
		"to": "{{NAME}} <{{EMAIL}}>"
	}
}
````