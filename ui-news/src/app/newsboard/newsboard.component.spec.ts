import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataLifeCycle } from '@shared/types/data-lifecycle';
import { of, throwError } from 'rxjs';

import { NewsboardComponent } from './newsboard.component';
import { NewsboardService } from './newsboard.service';

describe('NewsboardComponent', () => {
  let component: NewsboardComponent;
  let fixture: ComponentFixture<NewsboardComponent>;
  let newsboardService: NewsboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [NewsboardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsboardComponent);
    newsboardService = TestBed.inject(NewsboardService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should validate ngOnInit service fail', fakeAsync(() => {
    spyOn(newsboardService, 'fetchNews').and.returnValue(throwError({msg: 'this is error.'}));

    // resetting value to original
    component.articles = [];

    component.ngOnInit();
    tick(1);
    fixture.detectChanges();
    expect(component.articles.length).toBe(0);
    expect(component.lifeCycle).toBe(DataLifeCycle.LoadingError);
  }));

  it('should validate ngOnInit', fakeAsync(() => {
    spyOn(newsboardService, 'fetchNews').and.returnValue(of({
      articles: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]
    }));

    component.ngOnInit();
    fixture.detectChanges();
    expect(component.articles.length).toBe(3);
    expect(component.lifeCycle).toBe(DataLifeCycle.Loaded);
  }));

  it('should validate updateFilterString service fail', () => {
    spyOn(newsboardService, 'fetchNews').and.returnValue(throwError({msg: 'this is error.'}));

    component.articles = [];
    
    component.updateFilterString('random')
    fixture.detectChanges();
    expect(component.articles.length).toBe(0);
    expect(component.lifeCycle).toBe(DataLifeCycle.LoadingError);
  });

  it('should validate updateFilterString', () => {
    spyOn(newsboardService, 'fetchNews').and.returnValue(of({
      articles: [
        { id: 1 },
        { id: 2 },
      ]
    }));

    component.updateFilterString('random')
    fixture.detectChanges();
    expect(component.articles.length).toBe(2);
    expect(component.lifeCycle).toBe(DataLifeCycle.Loaded);
  });

  it('should validate openUrl', () => {
    spyOn(window, 'open');
    component.openUrl('http://www.example.com');
    expect(window.open).toHaveBeenCalled();
  })
});
