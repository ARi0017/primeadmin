import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmsComponent } from './cms.component';
import { TextEditorComponent } from './text-editor/text-editor.component';

const routes: Routes = [
  {
    path: '',
    component: CmsComponent,
    data: {
      title: 'CMS'
    }
  },
  {
    path: ':id',
    component: TextEditorComponent,
    data: {
      title: 'Edit CMS'
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class CmsRoutingModule {}
