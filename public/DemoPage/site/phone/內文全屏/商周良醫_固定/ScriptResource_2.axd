﻿// (c) 2010 CodePlex Foundation
(function(){var b="ExtendedDragDrop";function a(){var m="keypress",l="dragleave",k="dragenter",j="dragstart",h="dragover",g="mousemove",f="mouseup",i="initialize",e=false,b=true,d="dragStop",c="dragStart",a=null;Type.registerNamespace("Sys.Extended.UI");Sys.Extended.UI.IDragSource=function(){};Sys.Extended.UI.IDragSource.prototype={get_dragDataType:function(){throw Error.notImplemented();},getDragData:function(){throw Error.notImplemented();},get_dragMode:function(){throw Error.notImplemented();},onDragStart:function(){throw Error.notImplemented();},onDrag:function(){throw Error.notImplemented();},onDragEnd:function(){throw Error.notImplemented();}};Sys.Extended.UI.IDragSource.registerInterface("Sys.Extended.UI.IDragSource");Sys.Extended.UI.IDropTarget=function(){};Sys.Extended.UI.IDropTarget.prototype={get_dropTargetElement:function(){throw Error.notImplemented();},canDrop:function(){throw Error.notImplemented();},drop:function(){throw Error.notImplemented();},onDragEnterTarget:function(){throw Error.notImplemented();},onDragLeaveTarget:function(){throw Error.notImplemented();},onDragInTarget:function(){throw Error.notImplemented();}};Sys.Extended.UI.IDropTarget.registerInterface("Sys.Extended.UI.IDropTarget");Sys.Extended.UI.DragMode=function(){throw Error.invalidOperation();};Sys.Extended.UI.DragMode.prototype={Copy:0,Move:1};Sys.Extended.UI.DragMode.registerEnum("Sys.Extended.UI.DragMode");Sys.Extended.UI.DragDropEventArgs=function(c,a,b){this._dragMode=c;this._dataType=a;this._data=b};Sys.Extended.UI.DragDropEventArgs.prototype={get_dragMode:function(){return this._dragMode||a},get_dragDataType:function(){return this._dataType||a},get_dragData:function(){return this._data||a}};Sys.Extended.UI.DragDropEventArgs.registerClass("Sys.Extended.UI.DragDropEventArgs");Sys.Extended.UI._DragDropManager=function(){this._instance=a;this._events=a};Sys.Extended.UI._DragDropManager.prototype={add_dragStart:function(a){this.get_events().addHandler(c,a)},remove_dragStart:function(a){this.get_events().removeHandler(c,a)},get_events:function(){if(!this._events)this._events=new Sys.EventHandlerList;return this._events},add_dragStop:function(a){this.get_events().addHandler(d,a)},remove_dragStop:function(a){this.get_events().removeHandler(d,a)},_getInstance:function(){var a=this;if(!a._instance){if(Sys.Browser.agent===Sys.Browser.InternetExplorer)a._instance=new Sys.Extended.UI.IEDragDropManager;else a._instance=new Sys.Extended.UI.GenericDragDropManager;a._instance.initialize();a._instance.add_dragStart(Function.createDelegate(a,a._raiseDragStart));a._instance.add_dragStop(Function.createDelegate(a,a._raiseDragStop))}return a._instance},startDragDrop:function(b,c,d,a){this._getInstance().startDragDrop(b,c,d,a)},registerDropTarget:function(a){this._getInstance().registerDropTarget(a)},unregisterDropTarget:function(a){this._getInstance().unregisterDropTarget(a)},dispose:function(){delete this._events;Sys.Application.unregisterDisposableObject(this);Sys.Application.removeComponent(this)},_raiseDragStart:function(d,b){var a=this.get_events().getHandler(c);a&&a(this,b)},_raiseDragStop:function(c,b){var a=this.get_events().getHandler(d);a&&a(this,b)}};Sys.Extended.UI._DragDropManager.registerClass("Sys.Extended.UI._DragDropManager");Sys.Extended.UI.DragDropManager=new Sys.Extended.UI._DragDropManager;Sys.Extended.UI.IEDragDropManager=function(){var c=this;Sys.Extended.UI.IEDragDropManager.initializeBase(c);c._dropTargets=a;c._radius=10;c._useBuiltInDragAndDropFunctions=b;c._activeDragVisual=a;c._activeContext=a;c._activeDragSource=a;c._underlyingTarget=a;c._oldOffset=a;c._potentialTarget=a;c._isDragging=e;c._mouseUpHandler=a;c._documentMouseMoveHandler=a;c._documentDragOverHandler=a;c._dragStartHandler=a;c._mouseMoveHandler=a;c._dragEnterHandler=a;c._dragLeaveHandler=a;c._dragOverHandler=a;c._dropHandler=a};Sys.Extended.UI.IEDragDropManager.prototype={add_dragStart:function(a){this.get_events().addHandler(c,a)},remove_dragStart:function(a){this.get_events().removeHandler(c,a)},add_dragStop:function(a){this.get_events().addHandler(d,a)},remove_dragStop:function(a){this.get_events().removeHandler(d,a)},initialize:function(){var a=this;Sys.Extended.UI.IEDragDropManager.callBaseMethod(a,i);a._mouseUpHandler=Function.createDelegate(a,a._onMouseUp);a._documentMouseMoveHandler=Function.createDelegate(a,a._onDocumentMouseMove);a._documentDragOverHandler=Function.createDelegate(a,a._onDocumentDragOver);a._dragStartHandler=Function.createDelegate(a,a._onDragStart);a._mouseMoveHandler=Function.createDelegate(a,a._onMouseMove);a._dragEnterHandler=Function.createDelegate(a,a._onDragEnter);a._dragLeaveHandler=Function.createDelegate(a,a._onDragLeave);a._dragOverHandler=Function.createDelegate(a,a._onDragOver);a._dropHandler=Function.createDelegate(a,a._onDrop)},dispose:function(){var b=this;if(b._dropTargets){for(var c=0;c<b._dropTargets;c++)b.unregisterDropTarget(b._dropTargets[c]);b._dropTargets=a}Sys.Extended.UI.IEDragDropManager.callBaseMethod(b,"dispose")},startDragDrop:function(f,e,k,i){var d=this,m=window._event;if(d._isDragging)return;d._underlyingTarget=a;d._activeDragSource=f;d._activeDragVisual=e;d._activeContext=k;d._useBuiltInDragAndDropFunctions=typeof i!="undefined"?i:b;var j={x:m.clientX,y:m.clientY};e.originalPosition=e.style.position;e.style.position="absolute";document._lastPosition=j;e.startingPoint=j;var n=d.getScrollOffset(e,b);e.startingPoint=d.addPoints(e.startingPoint,n);var g=parseInt(e.style.left),h=parseInt(e.style.top);if(isNaN(g))g="0";if(isNaN(h))h="0";e.startingPoint=d.subtractPoints(e.startingPoint,{x:g,y:h});d._prepareForDomChanges();f.onDragStart();var o=new Sys.Extended.UI.DragDropEventArgs(f.get_dragMode(),f.get_dragDataType(),f.getDragData(k)),l=d.get_events().getHandler(c);l&&l(d,o);d._recoverFromDomChanges();d._wireEvents();d._drag(b)},_stopDragDrop:function(c){var b=this,g=window._event;if(b._activeDragSource!=a){b._unwireEvents();if(!c)c=b._underlyingTarget==a;!c&&b._underlyingTarget!=a&&b._underlyingTarget.drop(b._activeDragSource.get_dragMode(),b._activeDragSource.get_dragDataType(),b._activeDragSource.getDragData(b._activeContext));b._activeDragSource.onDragEnd(c);var f=b.get_events().getHandler(d);f&&f(b,Sys.EventArgs.Empty);b._activeDragVisual.style.position=b._activeDragVisual.originalPosition;b._activeDragSource=a;b._activeContext=a;b._activeDragVisual=a;b._isDragging=e;b._potentialTarget=a;g.preventDefault()}},_drag:function(h){var c=this,g=window._event,f={x:g.clientX,y:g.clientY};document._lastPosition=f;var i=c.getScrollOffset(c._activeDragVisual,b),d=c.addPoints(c.subtractPoints(f,c._activeDragVisual.startingPoint),i);if(!h&&parseInt(c._activeDragVisual.style.left)==d.x&&parseInt(c._activeDragVisual.style.top)==d.y)return;$common.setLocation(c._activeDragVisual,d);c._prepareForDomChanges();c._activeDragSource.onDrag();c._recoverFromDomChanges();c._potentialTarget=c._findPotentialTarget(c._activeDragSource,c._activeDragVisual);var e=c._potentialTarget!=c._underlyingTarget||c._potentialTarget==a;e&&c._underlyingTarget!=a&&c._leaveTarget(c._activeDragSource,c._underlyingTarget);if(c._potentialTarget!=a)if(e){c._underlyingTarget=c._potentialTarget;c._enterTarget(c._activeDragSource,c._underlyingTarget)}else c._moveInTarget(c._activeDragSource,c._underlyingTarget);else c._underlyingTarget=a},_wireEvents:function(){var a=this;if(a._useBuiltInDragAndDropFunctions){$addHandler(document,f,a._mouseUpHandler);$addHandler(document,g,a._documentMouseMoveHandler);$addHandler(document.body,h,a._documentDragOverHandler);$addHandler(a._activeDragVisual,j,a._dragStartHandler);$addHandler(a._activeDragVisual,"dragend",a._mouseUpHandler);$addHandler(a._activeDragVisual,"drag",a._mouseMoveHandler)}else{$addHandler(document,f,a._mouseUpHandler);$addHandler(document,g,a._mouseMoveHandler)}},_unwireEvents:function(){var a=this;if(a._useBuiltInDragAndDropFunctions){$removeHandler(a._activeDragVisual,"drag",a._mouseMoveHandler);$removeHandler(a._activeDragVisual,"dragend",a._mouseUpHandler);$removeHandler(a._activeDragVisual,j,a._dragStartHandler);$removeHandler(document.body,h,a._documentDragOverHandler);$removeHandler(document,g,a._documentMouseMoveHandler);$removeHandler(document,f,a._mouseUpHandler)}else{$removeHandler(document,g,a._mouseMoveHandler);$removeHandler(document,f,a._mouseUpHandler)}},registerDropTarget:function(c){var b=this;if(b._dropTargets==a)b._dropTargets=[];Array.add(b._dropTargets,c);b._wireDropTargetEvents(c)},unregisterDropTarget:function(a){this._unwireDropTargetEvents(a);this._dropTargets&&Array.remove(this._dropTargets,a)},_wireDropTargetEvents:function(c){var b=this,a=c.get_dropTargetElement();a._dropTarget=c;$addHandler(a,k,b._dragEnterHandler);$addHandler(a,l,b._dragLeaveHandler);$addHandler(a,h,b._dragOverHandler);$addHandler(a,"drop",b._dropHandler)},_unwireDropTargetEvents:function(d){var c=this,b=d.get_dropTargetElement();if(b._dropTarget){b._dropTarget=a;$removeHandler(b,k,c._dragEnterHandler);$removeHandler(b,l,c._dragLeaveHandler);$removeHandler(b,h,c._dragOverHandler);$removeHandler(b,"drop",c._dropHandler)}},_onDragStart:function(e){window._event=e;document.selection.empty();var d=e.dataTransfer;if(!d&&e.rawEvent)d=e.rawEvent.dataTransfer;var c=this._activeDragSource.get_dragDataType().toLowerCase(),b=this._activeDragSource.getDragData(this._activeContext);if(b){if(c!="text"&&c!="url"){c="text";if(b.innerHTML!=a)b=b.innerHTML}d.effectAllowed="move";d.setData(c,b.toString())}},_onMouseUp:function(a){window._event=a;this._stopDragDrop(e)},_onDocumentMouseMove:function(a){window._event=a;this._dragDrop()},_onDocumentDragOver:function(a){window._event=a;this._potentialTarget&&a.preventDefault()},_onMouseMove:function(a){window._event=a;this._drag()},_onDragEnter:function(c){window._event=c;if(this._isDragging)c.preventDefault();else for(var b=Sys.Extended.UI.IEDragDropManager._getDataObjectsForDropTarget(this._getDropTarget(c.target)),a=0;a<b.length;a++)this._dropTarget.onDragEnterTarget(Sys.Extended.UI.DragMode.Copy,b[a].type,b[a].value)},_onDragLeave:function(c){window._event=c;if(this._isDragging)c.preventDefault();else for(var b=Sys.Extended.UI.IEDragDropManager._getDataObjectsForDropTarget(this._getDropTarget(c.target)),a=0;a<b.length;a++)this._dropTarget.onDragLeaveTarget(Sys.Extended.UI.DragMode.Copy,b[a].type,b[a].value)},_onDragOver:function(c){window._event=c;if(this._isDragging)c.preventDefault();else for(var b=Sys.Extended.UI.IEDragDropManager._getDataObjectsForDropTarget(this._getDropTarget(c.target)),a=0;a<b.length;a++)this._dropTarget.onDragInTarget(Sys.Extended.UI.DragMode.Copy,b[a].type,b[a].value)},_onDrop:function(c){window._event=c;if(!this._isDragging)for(var b=Sys.Extended.UI.IEDragDropManager._getDataObjectsForDropTarget(this._getDropTarget(c.target)),a=0;a<b.length;a++)this._dropTarget.drop(Sys.Extended.UI.DragMode.Copy,b[a].type,b[a].value);c.preventDefault()},_getDropTarget:function(b){while(b){if(b._dropTarget!=a)return b._dropTarget;b=b.parentNode}return a},_dragDrop:function(){if(this._isDragging)return;this._isDragging=b;this._activeDragVisual.dragDrop();document.selection.empty()},_moveInTarget:function(a,b){this._prepareForDomChanges();b.onDragInTarget(a.get_dragMode(),a.get_dragDataType(),a.getDragData(this._activeContext));this._recoverFromDomChanges()},_enterTarget:function(a,b){this._prepareForDomChanges();b.onDragEnterTarget(a.get_dragMode(),a.get_dragDataType(),a.getDragData(this._activeContext));this._recoverFromDomChanges()},_leaveTarget:function(a,b){this._prepareForDomChanges();b.onDragLeaveTarget(a.get_dragMode(),a.get_dragDataType(),a.getDragData(this._activeContext));this._recoverFromDomChanges()},_findPotentialTarget:function(e){var c=this,h=window._event;if(c._dropTargets==a)return a;for(var l=e.get_dragDataType(),k=e.get_dragMode(),j=e.getDragData(c._activeContext),f=c.getScrollOffset(document.body,b),m=h.clientX+f.x,n=h.clientY+f.y,i={x:m-c._radius,y:n-c._radius,width:c._radius*2,height:c._radius*2},g,d=0;d<c._dropTargets.length;d++){g=$common.getBounds(c._dropTargets[d].get_dropTargetElement());if($common.overlaps(i,g)&&c._dropTargets[d].canDrop(k,l,j))return c._dropTargets[d]}return a},_prepareForDomChanges:function(){this._oldOffset=$common.getLocation(this._activeDragVisual)},_recoverFromDomChanges:function(){var a=this,c=$common.getLocation(a._activeDragVisual);if(a._oldOffset.x!=c.x||a._oldOffset.y!=c.y){a._activeDragVisual.startingPoint=a.subtractPoints(a._activeDragVisual.startingPoint,a.subtractPoints(a._oldOffset,c));scrollOffset=a.getScrollOffset(a._activeDragVisual,b);var d=a.addPoints(a.subtractPoints(document._lastPosition,a._activeDragVisual.startingPoint),scrollOffset);$common.setLocation(a._activeDragVisual,d)}},addPoints:function(a,b){return{x:a.x+b.x,y:a.y+b.y}},subtractPoints:function(a,b){return{x:a.x-b.x,y:a.y-b.y}},getScrollOffset:function(c,f){var d=c.scrollLeft,e=c.scrollTop;if(f){var b=c.parentNode;while(b!=a&&b.scrollLeft!=a){d+=b.scrollLeft;e+=b.scrollTop;if(b==document.body&&(d!=0&&e!=0))break;b=b.parentNode}}return{x:d,y:e}},getBrowserRectangle:function(){var c=window.innerWidth,b=window.innerHeight;if(c==a)c=document.documentElement.clientWidth;if(b==a)b=document.documentElement.clientHeight;return{x:0,y:0,width:c,height:b}},getNextSibling:function(b){for(b=b.nextSibling;b!=a;b=b.nextSibling)if(b.innerHTML!=a)return b;return a},hasParent:function(b){return b.parentNode!=a&&b.parentNode.tagName!=a}};Sys.Extended.UI.IEDragDropManager.registerClass("Sys.Extended.UI.IEDragDropManager",Sys.Component);Sys.Extended.UI.IEDragDropManager._getDataObjectsForDropTarget=function(h){if(h==a)return[];for(var f=window._event,g=[],c=["URL","Text"],d,b=0;b<c.length;b++){var e=f.dataTransfer;if(!e&&f.rawEvent)e=f.rawEvent.dataTransfer;d=e.getData(c[b]);if(h.canDrop(Sys.Extended.UI.DragMode.Copy,c[b],d))d&&Array.add(g,{type:c[b],value:d})}return g};Sys.Extended.UI.GenericDragDropManager=function(){var b=this;Sys.Extended.UI.GenericDragDropManager.initializeBase(b);b._dropTargets=a;b._scrollEdgeConst=40;b._scrollByConst=10;b._scroller=a;b._scrollDeltaX=0;b._scrollDeltaY=0;b._activeDragVisual=a;b._activeContext=a;b._activeDragSource=a;b._oldOffset=a;b._potentialTarget=a;b._mouseUpHandler=a;b._mouseMoveHandler=a;b._keyPressHandler=a;b._scrollerTickHandler=a};Sys.Extended.UI.GenericDragDropManager.prototype={initialize:function(){var a=this;Sys.Extended.UI.GenericDragDropManager.callBaseMethod(a,i);a._mouseUpHandler=Function.createDelegate(a,a._onMouseUp);a._mouseMoveHandler=Function.createDelegate(a,a._onMouseMove);a._keyPressHandler=Function.createDelegate(a,a._onKeyPress);a._scrollerTickHandler=Function.createDelegate(a,a._onScrollerTick);a._scroller=new Sys.Timer;a._scroller.set_interval(10);a._scroller.add_tick(a._scrollerTickHandler)},startDragDrop:function(b,c,d){var a=this;a._activeDragSource=b;a._activeDragVisual=c;a._activeContext=d;Sys.Extended.UI.GenericDragDropManager.callBaseMethod(a,"startDragDrop",[b,c,d])},_stopDragDrop:function(a){this._scroller.set_enabled(e);Sys.Extended.UI.GenericDragDropManager.callBaseMethod(this,"_stopDragDrop",[a])},_drag:function(a){Sys.Extended.UI.GenericDragDropManager.callBaseMethod(this,"_drag",[a]);this._autoScroll()},_wireEvents:function(){$addHandler(document,f,this._mouseUpHandler);$addHandler(document,g,this._mouseMoveHandler);$addHandler(document,m,this._keyPressHandler)},_unwireEvents:function(){$removeHandler(document,m,this._keyPressHandler);$removeHandler(document,g,this._mouseMoveHandler);$removeHandler(document,f,this._mouseUpHandler)},_wireDropTargetEvents:function(){},_unwireDropTargetEvents:function(){},_onMouseUp:function(a){window._event=a;this._stopDragDrop(e)},_onMouseMove:function(a){window._event=a;this._drag()},_onKeyPress:function(a){window._event=a;var c=a.keyCode?a.keyCode:a.rawEvent.keyCode;c==27&&this._stopDragDrop(b)},_autoScroll:function(){var a=this,d=window._event,c=a.getBrowserRectangle();if(c.width>0){a._scrollDeltaX=a._scrollDeltaY=0;if(d.clientX<c.x+a._scrollEdgeConst)a._scrollDeltaX=-a._scrollByConst;else if(d.clientX>c.width-a._scrollEdgeConst)a._scrollDeltaX=a._scrollByConst;if(d.clientY<c.y+a._scrollEdgeConst)a._scrollDeltaY=-a._scrollByConst;else if(d.clientY>c.height-a._scrollEdgeConst)a._scrollDeltaY=a._scrollByConst;if(a._scrollDeltaX!=0||a._scrollDeltaY!=0)a._scroller.set_enabled(b);else a._scroller.set_enabled(e)}},_onScrollerTick:function(){var d=document.body.scrollLeft,f=document.body.scrollTop;window.scrollBy(this._scrollDeltaX,this._scrollDeltaY);var c=document.body.scrollLeft,e=document.body.scrollTop,a=this._activeDragVisual,b={x:parseInt(a.style.left)+(c-d),y:parseInt(a.style.top)+(e-f)};$common.setLocation(a,b)}};Sys.Extended.UI.GenericDragDropManager.registerClass("Sys.Extended.UI.GenericDragDropManager",Sys.Extended.UI.IEDragDropManager)}if(window.Sys&&Sys.loader)Sys.loader.registerScript(b,["ExtendedTimer","ExtendedCommon"],a);else a()})();