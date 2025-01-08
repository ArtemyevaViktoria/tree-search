import { provideRouter, Routes } from "@angular/router";
import { TreeWrapperComponent } from "./components/tree-wrapper/tree-wrapper.component";

export const routes: Routes = [
  { path: "", component: TreeWrapperComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

export const appRoutes = provideRouter(routes);
