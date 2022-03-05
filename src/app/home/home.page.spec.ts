import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Color, Direction, Pawn } from '../app.model';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(), FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new pawn', () => {
    const command = 'PLACE 0,0,NORTH,BLACK';
    component.executeCommand(command);
    const expectedData = {
      x: 0,
      y: 0,
      facingDirection: Direction.NORTH,
      color: Color.BLACK,
      isFirstMove: true
    };
    expect({...component.pawn}).toEqual(expectedData);
  });

  it('should change the direction of pawn and move', () => {
    let command = 'PLACE 2,2,NORTH,BLACK';
    component.executeCommand(command);
    command = 'RIGHT';
    component.executeCommand(command);
    command = 'MOVE 2';
    component.executeCommand(command);
    const expectedData = {
      x: 4,
      y: 2,
      facingDirection: Direction.EAST,
      color: Color.BLACK,
      isFirstMove: false
    };
    expect({...component.pawn}).toEqual(expectedData);
  });
});
