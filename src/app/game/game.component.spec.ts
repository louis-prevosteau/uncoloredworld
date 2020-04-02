import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GameComponent } from './game.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        GameComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(GameComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'projet-jeu2'`, () => {
    const fixture = TestBed.createComponent(GameComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('projet-jeu2');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(GameComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('projet-jeu2 app is running!');
  });
});
