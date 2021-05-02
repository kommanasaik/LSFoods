import { NgModule } from '@angular/core';
import { WeightapdPipe } from './weight/weight';
import { BillweightPipe } from './billweight/billweight';
@NgModule({
	declarations: [WeightapdPipe,
    BillweightPipe],
	imports: [],
	exports: [WeightapdPipe,
    BillweightPipe]
})
export class PipesModule {}
