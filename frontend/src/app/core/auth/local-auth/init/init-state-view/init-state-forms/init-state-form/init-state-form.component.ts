import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InitState } from '../../../init-state';

export abstract class InitStateFormComponent {
  abstract form: FormGroup;
  abstract eventEmitter: EventEmitter<InitState>;
}
