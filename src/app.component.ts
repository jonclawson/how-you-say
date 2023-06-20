import 'zone.js/dist/zone';
import { Component } from '@angular/core';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  name = 'Typeahead Triple Dropdown';

  selected;
  objects = [
    { id: 1, value: 'Level 1' },
    { id: 2, value: 'Level 2' },
    { id: 3, value: 'Level 3' },
    {
      id: 4,
      value: 'Level 4',
      options: [
        { id: 5, value: 'Level 4A' },
        { id: 6, value: 'Level 4B' },
        {
          id: 7,
          value: 'Level 4C',
          options: [
            { id: 8, value: 'Level 4C1' },
            { id: 9, value: 'Level 4C2' },
            { id: 10, value: 'Level 4C3' },
          ],
        },
      ],
    },
  ];
  states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Dakota',
    'North Carolina',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  onChange(option) {
    this.selected = option;
  }
}
