import {Feature, Shortcut} from '../settings'

export const config: Feature = { // An object that describes new feature we introduce
    id: 'hello_world',  // Feature id - any unique string would do
    name: 'Hello World',  // Feature name - would be displayed in the settings menu
    settings: [ // List of settings for the feature
        {
            type: 'shortcut', // Type of the setting. See other ones defined here: https://github.com/roam-unofficial/roam-toolkit/blob/master/src/ts/core/settings/settings.ts#L36
            id: 'hello_world_alert', // Id of the setting - any unique string would do
            label: 'Alert Hello World',  // Shortcut name - would be displayed in setting menu
            initValue: 'alt+i',  // Initial shortcut value
            // This defines what function would be called when shortcut is pressed
            onPress: () => alertHelloWorld(),
        } as Shortcut,
    ],
}

function alertHelloWorld () {
    alert("Hello World!")
}
