import BaseManager from "./BaseManager";
const {ccclass} = cc._decorator;

export type X = (data:any) => void;
type Y = { [propName:string]:X[] }

@ccclass
export class GlobalManager extends BaseManager {

	static instance: GlobalManager = null;

	private m:Y = {[Event.E1]:[], [Event.E2]:[]};

	onLoad(): void {
		GlobalManager.instance = this;
		cc.game.addPersistRootNode(this.node);

		console.log('..xx');
		this.scheduleOnce(function(){
			this.node.emit(Event.E1, 'e1',3);
			console.log('..1');
			cc.director.loadScene('main');
			console.log('..2');
		}, 3);
	}

	oo(event:Event, data:any) {
		console.log('Event received....');
		for (const listener of this.m[event]) {
			listener(data);
		}
	}

	registerEvent(event: Event, listener: X) {
		this.m[event].push(listener);
	}
}

export enum Event {
	E1 = 'event_a', E2 = 'event_b'
}
