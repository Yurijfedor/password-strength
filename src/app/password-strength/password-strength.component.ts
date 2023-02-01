import { Component, Input, SimpleChange, OnChanges} from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent {

  @Input() public passwordToCheck!: string;
  
  bar0!: string;
  bar1!: string;
  bar2!: string;
  
  private colors = ['red', 'yellow', 'green'];

  private static checkStrength(p: string ) {
  
  let force = 0;

  const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
   
  const lowerLetters = /[a-z]+/.test(p);
  const upperLetters = /[A-Z]+/.test(p);
  const numbers = /[0-9]+/.test(p);
  const symbols = regex.test(p);

  const flags = [lowerLetters, upperLetters, numbers, symbols];

  let passedMatches = 0;
  for (const flag of flags) {
    passedMatches += flag === true ? 1 : 0;
  }

  force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
  force += passedMatches * 10;

  force = (p.length <= 8) ? Math.min(force, 10) : force;

  force = (passedMatches === 1) ? Math.min(force, 10) : force;
  force = (passedMatches === 2) ? Math.min(force, 20) : force;
  force = (passedMatches === 3) ? Math.min(force, 30) : force;
  force = (passedMatches === 4) ? Math.min(force, 40) : force;

  return force;
 }
  
  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToCheck'].currentValue;
    this.setBarColors(4, '#DDD');
    if (password && password.length <= 10) {
    this.setBarColors(4, '#F00'); 
    } else {
      const c = this.getColor(PasswordStrengthComponent.checkStrength(password));
      this.setBarColors(c.index, c.color);
    }
  }

  private getColor(s: number) {
    let index = 0;
    if (s === 10) {
     index = 0;
    } else if (s === 20) {
      index = 1;
    } else if (s === 30) {
      index = 2;
    } else if (s === 40) {
      index = 3;
    } else {
      index = 4;
    }
    return {
      index: index + 1,
      color: this.colors[index]
    };
  }

  private setBarColors(count: number, col: string) {
    for (let n = 0; n < count; n++) {
      this['bar' + n] = col;
    }
  }

}
