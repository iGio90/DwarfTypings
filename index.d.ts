/**
 * Shortcut to retrieve native backtrace
 * @param context: the CpuContext object
 */
declare function backtrace(context?: CpuContext): DebugSymbol[] | null;
/**
 * Enumerate exports for the given module name or pointer
 * @param module an hex/int address or string name
 */
declare function enumerateExports(module: any): Array<ModuleExportDetails>;
/**
 * Enumerate imports for the given module name or pointer
 * @param module an hex/int address or string name
 */
declare function enumerateImports(module): Array<ModuleExportDetails>;
/**
 * Enumerate java classes
 * @param useCache false by default
 */
declare function enumerateJavaClasses(useCache?);
/**
 * Enumerate method for the given class
 */
declare function enumerateJavaMethods(className: string): void;
/**
 * Enumerate modules for ObjC inspector panel
 */
declare function enumerateObjCModules(className: string): void;
/**
 * Enumerate objc classes
 * @param useCache false by default
 */
declare function enumerateObjCClasses(moduleName: string);
/**
 * Enumerate method for the given class
 */
declare function enumerateObjCMethods(className: string): void;
/**
 * Enumerate loaded modules
 */
declare function enumerateModules(fillInformation?: boolean);
/**
 * Enumerate all information about the module (imports / exports / symbols)
 * @param fridaModule object from frida-gum
 */
declare function enumerateModuleInfo(fridaModule: Module | string): Module;
/**
 * Enumerate all mapped ranges
 */
declare function enumerateRanges(): RangeDetails[];
/**
 * Enumerate symbols for the given module name or pointer
 * @param module an hex/int address or string name
 */
declare function enumerateSymbols(module): Array<ModuleSymbolDetails>;
/**
 * Evaluate javascript. Used from the UI to inject javascript code into the process
 * @param w
 */
declare function evaluate(w);
/**
 * Evaluate javascript. Used from the UI to inject javascript code into the process
 * @param w
 */
declare function evaluateFunction(w);
/**
 * Evaluate any input and return a NativePointer
 * @param w
 */
declare function evaluatePtr(w: any): NativePointer;
/**
 * Shortcut to quickly retrieve an export
 * ```javascript
 * const openAddress = findExport('open');
 * const myTargetAddress = findExport('target_func', 'target_module.so');
 * ```
 * @param name: the name of the export
 * @param module: optional name of the module
 */
declare function findExport(name, module?): NativePointer | null;
/**
 * Find a module providing any argument. Could be a string/int pointer or module name
 */
declare function findModule(module: any): Module | Module[] | null;
/**
 * Find a symbol matching the given pattern
 */
declare function findSymbol(pattern);
/**
 * get telescope information for the given pointer argument
 * @param p: pointer
 */
declare function getAddressTs(p);
/**
 * Return an array of DebugSymbol for the requested pointers
 * @param ptrs: an array of NativePointer
 */
declare function getDebugSymbols(ptrs): DebugSymbol[];
/**
 * Shortcut to retrieve an Instruction object for the given address
 */
declare function getInstruction(address);
/**
 * Return a RangeDetails object or null for the requested pointer
 */
declare function getRange(address: any): RangeDetails | null;
/**
 * Return DebugSymbol or null for the given pointer
 */
declare function getSymbolByAddress(pt): DebugSymbol | null;
/**
 * Hook all the methods for the given java class
 * ```javascript
 * hookAllJavaMethods('android.app.Activity', function() {
 *     console.log('hello from:', this.className, this.method);
 * })
 * ```
 * @param className
 * @param callback
 */
declare function hookAllJavaMethods(className: string, callback: Function): boolean;
/**
 * Receive a callback whenever a java class is going to be loaded by the class loader.
 * ```javascript
 * hookClassLoaderClassInitialization('com.target.classname', function() {
 *     console.log('target is being loaded');
 * })
 * ```
 * @param className
 * @param callback
 */
declare function hookClassLoaderClassInitialization(className: string, callback: Function): boolean;
/**
 * Hook the constructor of the given java class
 * ```javascript
 * hookJavaConstructor('android.app.Activity', function() {
 *     console.log('activity created');
 * })
 * ```
 * @param className
 * @param callback
 */
declare function hookJavaConstructor(className: string, callback: Function): boolean;
/**
 * Hook the constructor of the given java class
 * ```javascript
 * hookJavaConstructor('android.app.Activity.onCreate', function() {
 *     console.log('activity created');
 *     var savedInstanceState = arguments[0];
 *     if (savedInstanceState !== null) {
 *         return this.finish();
 *     } else {
 *         return this.overload.call(this, arguments);
 *     }
 * })
 * ```
 * @param targetClassMethod
 * @param callback
 */
declare function hookJavaMethod(targetClassMethod: string, callback: Function): boolean;
/**
 * Receive a callback when the native module is being loaded
 * ```javascript
 * hookModuleInitialization('libtarget.so', function() {
 *     console.log('libtarget is being loaded');
 * });
 * ```
 * @param moduleName
 * @param callback
 */
declare function hookModuleInitialization(moduleName: string, callback: Function): boolean;
/**
 * Map the given blob as hex string using memfd:create with the given name
 * @return a negative integer if error or fd
 */
declare function injectBlob(name: string, blob: string);
/**
 * @return a boolean indicating if the given pointer is currently watched
 */
declare function isAddressWatched(pt: any): boolean;
/**
 * @return a java stack trace. Must be executed in JVM thread
 */
declare function javaBacktrace();
/**
 * @return the explorer object for the given java handle
 */
declare function jvmExplorer(handle);
/**
 * log whatever to Dwarf console
 */
declare function log(what): void;
/**
 * put a breakpoint on a native pointer or a java class with an optional evaluated condition
 * ```javascript
 * var nativeTarget = findExport('memcpy');
 * putBreakpoint(nativeTarget);
 * nativeTarget = findExport('open');
 * putBreakpoint(target, function() {
 *     if (this.context.x0.readUtf8String().indexOf('prefs.json') >= 0) {
 *         return true;
 *     }
 *     return false;
 * });
 * var javaTarget = 'android.app.Activity.onCreate';
 * putBreakpoint(javaTarget);
 * ```
 * @param address_or_class
 * @param condition
 */
declare function putBreakpoint(address_or_class: any, condition?: string | Function): boolean;
/**
 * Put a java class initialization breakpoint
 * ```javascript
 * putJavaClassInitializationBreakpoint('android.app.Activity');
 * ```
 * @param className
 */
declare function putJavaClassInitializationBreakpoint(className: string): boolean;
/**
 * Put a native module initialization breakpoint
 * ```javascript
 * putModuleInitializationBreakpoint('libtarget.so');
 * ```
 * @param moduleName
 */
declare function putModuleInitializationBreakpoint(moduleName: string): boolean;
/**
 * Put a watchpoint on the given address
 * ```javascript
 * putWatchpoint(0x1000, 'r');
 * var target = findExport('memcpy');
 * Interceptor.attach(target, {
 *     onLeave: function(ret) {
 *         putWatchpoint(this.context.x0, 'rw', function() {
 *            log(backtrace(this.context));
 *         });
 *     }
 * });
 * ```
 * @param address
 * @param flags
 * @param callback
 */
declare function putWatchpoint(address: any, flags: string, callback?: Function);
/**
 * A shortcut and secure way to read a string from a pointer with frida on any os
 * @return the string pointed by address until termination or optional length
 */
declare function readString(address, length?);
/**
 * A shortcut for safely reading from memory
 * @return an ArrayBuffer of the given length filled with data starting from target address
 */
declare function readBytes(address, length);
/**
 * @return a pointer from the given address
 */
declare function readPointer(pt);
/**
 * resume the execution of the given thread id
 */
declare function releaseFromJs(tid): void;
/**
 * Remove a breakpoint on address_or_class
 * @return a boolean indicating if removal was successful
 */
declare function removeBreakpoint(address_or_class: any): boolean;
/**
 * Remove a java class initialization breakpoint on moduleName
 * @return a boolean indicating if removal was successful
 */
declare function removeJavaClassInitializationBreakpoint(moduleName: string): boolean;
/**
 * Remove a module initialization breakpoint on moduleName
 * @return a boolean indicating if removal was successful
 */
declare function removeModuleInitializationBreakpoint(moduleName: string): boolean;
/**
 * Remove a watchpoint on the given address
 * @return a boolean indicating if removal was successful
 */
declare function removeWatchpoint(address: any): boolean;
/**
 * Restart the application
 * Android only
 */
declare function restart(): boolean;
/**
 * Send whatever to the data panel
 * ```javascript
 * var sendCount = 0;
 * Interceptor.attach(findExport('send'), function() {
 *     setData(sendCount + '', this.context.x1.readByteArray(parseInt(this.context.x2)))
 *     sendCount++;
 * });
 * ```
 */
declare function setData(key, data);
/**
 * Start the java tracer on the given classes
 */
declare function startJavaTracer(classes: string[], callback: Function);
/**
 * Start the native tracer on the current thread
 * ```javascript
 * startNativeTracer(function() {
 *     log('===============');
 *     log(this.instruction);
 *     log(this.context);
 *     log('===============');
 *     if (shouldStopTracer) {
 *         this.stop();
 *     }
 * });
 * ```
 */
declare function startNativeTracer(callback);
/**
 * Stop the java tracer
 */
declare function stopJavaTracer(): boolean;
/**
 * start strace
 */
declare function strace(callback): boolean;
/**
 * Write the given hex string or ArrayBuffer into the given address
 */
declare function writeBytes(address: any, what: string | ArrayBuffer);
