/**
    Dwarf - Copyright (C) 2018-2020 Giovanni Rocca (iGio90)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
**/
/// <reference types="frida-gum" />
/**
 * ELF Fileparser
 */
declare class ELF_File {
    is64Bit: boolean;
    endian: string;
    fileHeader: ELF_File.ELF_Header | null;
    programHeaders: ELF_File.ELF_ProgamHeader[];
    sectionHeaders: ELF_File.ELF_SectionHeader[];
    /**
     * constructor
     *
     * @param filePath string
     */
    constructor(filePath: string);
}
declare namespace ELF_File {
    class ELF_Header {
        e_ident: number[];
        e_type: number;
        e_machine: number;
        e_version: number;
        e_entry: number;
        e_phoff: number;
        e_shoff: number;
        e_flags: number;
        e_ehsize: number;
        e_phentsize: number;
        e_phnum: number;
        e_shentsize: number;
        e_shnum: number;
        e_shstrndx: number;
        /**
         * constructor
         *
         * @param dataPtr NativePointer
         */
        constructor(dataPtr: NativePointer);
        toString: () => string;
    }
    namespace ELF_Header {
        /**
         * sizeof E_IDENT Array
         */
        const EI_NIDENT: number;
    }
    /**
     * ProgramHeader
     */
    class ELF_ProgamHeader {
        p_type: number;
        p_vaddr: number;
        p_paddr: number;
        p_filesz: number;
        p_memsz: number;
        p_offset: number;
        p_flags: number;
        p_align: number;
        /**
         * constructor
         *
         * @param dataPtr NativePointer
         * @param is64Bit boolean
         */
        constructor(dataPtr: NativePointer, is64Bit?: boolean);
        toString: () => string;
    }
    namespace ELF_ProgamHeader {
        const PT_TYPE_NAME: object;
    }
    /**
     * SectionHeader
     */
    class ELF_SectionHeader {
        name: string | null;
        data: NativePointer[];
        sh_name: number;
        sh_type: number;
        sh_flags: number;
        sh_addr: number;
        sh_offset: number;
        sh_size: number;
        sh_link: number;
        sh_info: number;
        sh_addralign: number;
        sh_entsize: number;
        /**
         * constructor
         *
         * @param dataPtr NativePointer
         * @param is64Bit boolean
         */
        constructor(dataPtr: NativePointer, is64Bit?: boolean);
        toString: () => string;
    }
    namespace ELF_SectionHeader {
        const SH_TYPE_NAME: Object;
    }
}

declare interface NativeTracerCallbacks {
    onInstruction?: Function;
    onCall?: Function;
    onJump?: Function;
    onReturn?: Function;
    onPrivilege?: Function;
}
/**
 * Shortcut to retrieve native backtrace
 * ```javascript
 * Interceptor.attach(targetPtr, function() {
 *     console.log(backtrace(this.context));
 * }
 * ```
 */
declare function backtrace(context?: CpuContext): DebugSymbol[] | null;
/**
 * Enumerate exports for the given module name or pointer
 * ```javascript
 * enumerateExports(Process.findModuleByName('libtarget.so'));
 * ```
 */
declare function enumerateExports(module: any): Array<ModuleExportDetails>;
/**
 * Enumerate imports for the given module name or pointer
 * ```javascript
 * enumerateImports(Process.findModuleByName('libtarget.so'));
 * ```
 */
declare function enumerateImports(module): Array<ModuleExportDetails>;
/**
 * Enumerate java classes
 * ```javascript
 * enumerateJavaClasses().forEach(function(clazz) {
 *     console.log(clazz);
 * });;
 * ```
 */
declare function enumerateJavaClasses(useCache?);
/**
 * Enumerate method for the given class name
 * ```javascript
 * enumerateJavaMethods('android.app.Activity');
 * ```
 */
declare function enumerateJavaMethods(className: string): void;
/**
 * Enumerate modules for ObjC inspector panel
 * ```javascript
 * enumerateObjCModules();
 * ```
 */
declare function enumerateObjCModules(): void;
/**
 * Enumerate ObjC classes in the given module
 * ```javascript
 * enumerateObjCClasses('module');
 * ```
 */
declare function enumerateObjCClasses(moduleName: string);
/**
 * Enumerate ObjC methods for the given class
 * ```javascript
 * enumerateObjCMethods('class');
 * ```
 */
declare function enumerateObjCMethods(className: string): void;
/**
 * Enumerate loaded modules
 * ```javascript
 * enumerateModules(true); // symbols, exports and imports - yes please.
 * ```
 */
declare function enumerateModules(fillInformation?: boolean);
/**
 * Enumerate all information about the module (imports / exports / symbols)
 * ```javascript
 * enumerateModuleInfo(Process.findModuleByName('target.so'));
 * ```
 */
declare function enumerateModuleInfo(fridaModule: Module | string): Module;
/**
 * Enumerate all mapped ranges
 * ```javascript
 * enumerateRanges().forEach(function(range) {
 *     console.log(range.base, range.size);
 * });
 * ```
 */
declare function enumerateRanges(): RangeDetails[];
/**
 * Enumerate symbols for the given module name or pointer
 * ```javascript
 * enumerateSymbols('module');
 * ```
 */
declare function enumerateSymbols(module): Array<ModuleSymbolDetails>;
/**
 * Evaluate javascript. Used from the UI to inject javascript code into the process
 * ```javascript
 * evaluate('console.log(1)');
 * ```
 */
declare function evaluate(jsCode: string);
/**
 * Evaluate javascript. Used from the UI to inject javascript code into the process
 * ```javascript
 * evaluateFunction('(function() {
 *     // do stuff
 * })();');
 * ```
 */
declare function evaluateFunction(jsFnc: string);
/**
 * Evaluate any input and return a NativePointer
 * ```javascript
 * evaluatePtr(10 + 10 + 0xabcd);
 * evaluatePtr('0xabcd');
 * ```
 */
declare function evaluatePtr(pointer: any): NativePointer;
/**
 * Shortcut to quickly retrieve an export
 * ```javascript
 * const openAddress = findExport('open');
 * const myTargetAddress = findExport('target_func', 'target_module.so');
 * ```
 */
declare function findExport(name, module?): NativePointer | null;
/**
 * Find a module providing any argument. Could be a string/int pointer or module name
 * ```javascript
 * findModule('mymodule');
 * ```
 */
declare function findModule(module: any): Module | Module[] | null;
/**
 * Find a symbol matching the given pattern
 * ```javascript
 * findSymbol('*link*');
 * ```
 */
declare function findSymbol(pattern);
/**
 * get telescope information for the given pointer argument
 * ```javascript
 * getAddressTs(0xdeadbeef);
 * ```
 */
declare function getAddressTs(p);
/**
 * Return an array of DebugSymbol for the requested pointers
 * ```javascript
 * getDebugSymbols([ptr(0x1234), ptr(0xabcd)]);
 * ```
 */
declare function getDebugSymbols(ptrs): DebugSymbol[];
/**
 * Shortcut to retrieve an Instruction object for the given address
 * ```javascript
 * getInstruction(0xabcd);
 * ```
 */
declare function getInstruction(address);
/**
 * Return a RangeDetails object or null for the requested pointer
 * ```javascript
 * getRange(0xabcd);
 * ```
 */
declare function getRange(address: any): RangeDetails | null;
/**
 * Return DebugSymbol or null for the given pointer
 * ```javascript
 * getSymbolByAddress(0xabcd);
 * ```
 */
declare function getSymbolByAddress(pt): DebugSymbol | null;
/**
 * Return elf headers of module
 * ```javascript
 * getELFHeader(); //returns elfheader of MainProcess
 * getELFHeader('libwhatever.so');
 * ```
 */
declare function getELFHeader(moduleName: string, isUICall?: boolean): ELF_File | null;
/**
 * Hook all the methods for the given java class
 * ```javascript
 * hookAllJavaMethods('android.app.Activity', function() {
 *     console.log('hello from:', this.className, this.method);
 * })
 * ```
 */
declare function hookAllJavaMethods(className: string, callback: Function): boolean;
/**
 * Receive a callback whenever a java class is going to be loaded by the class loader.
 * ```javascript
 * hookClassLoaderClassInitialization('com.target.classname', function() {
 *     console.log('target is being loaded');
 * })
 * ```
 */
declare function hookClassLoaderClassInitialization(className: string, callback: Function): boolean;
/**
 * Hook the constructor of the given java class
 * ```javascript
 * hookJavaConstructor('android.app.Activity', function() {
 *     console.log('activity created');
 * })
 * ```
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
 */
declare function hookJavaMethod(targetClassMethod: string, callback: Function): boolean;
/**
 * Receive a callback when the native module is being loaded
 * ```javascript
 * hookModuleInitialization('libtarget.so', function() {
 *     console.log('libtarget is being loaded');
 * });
 * ```
 */
declare function hookModuleInitialization(moduleName: string, callback: Function): boolean;
/**
 * Map the given blob as hex string using memfd:create with the given name
 * ```javascript
 * injectBlob('blob', 'aabbccddeeff');
 * ```
 */
declare function injectBlob(name: string, blob: string);
/**
 * ```javascript
 * var alreadyWatched = isAddressWatched(0x1234);
 * ```
 */
declare function isAddressWatched(pt: any): boolean;
/**
 * get the java stack trace. Must be executed in JVM thread
 * ```javascript
 * Java.perform(function() {
 *     console.log(javaBacktrace());
 * });
 * ```
 */
declare function javaBacktrace();
/**
 * get the explorer object for the given java handle.
 * required by UI
 */
declare function jvmExplorer(handle);
/**
 * log whatever to Dwarf console
 * ```javascript
 * log('12345');
 * ```
 */
declare function log(message?: any, ...optionalParams: any[]): void;
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
 */
declare function putBreakpoint(address_or_class: any, condition?: string | Function): boolean;
/**
 * Put a java class initialization breakpoint
 * ```javascript
 * putJavaClassInitializationBreakpoint('android.app.Activity');
 * ```
 */
declare function putJavaClassInitializationBreakpoint(className: string): boolean;
/**
 * Put a native module initialization breakpoint
 * ```javascript
 * putModuleInitializationBreakpoint('libtarget.so');
 * ```
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
 */
declare function putWatchpoint(address: any, flags: string | number, callback?: Function);
/**
 * A shortcut and secure way to read a string from a pointer with frida on any os
 * ```javascript
 * var what = readString(0x1234);
 * var a = readString(0xabcd, 32);
 * ```
 */
declare function readString(address, length?);
/**
 * A shortcut for safely reading from memory
 * ```javascript
 * var buf = readBytes(0x1234, 32);
 * ```
 */
declare function readBytes(address, length);
/**
 * get a pointer from the given address
 * ```javascript
 * var p = readPointer(0x1234);
 * ```
 */
declare function readPointer(pt);
/**
 * resume the execution of the given thread id when in breakpoints
 * ```javascript
 * Interceptor.attach(0x1234, function() {
 *     // do my stuff
 *     releaseFromJs(Process.getCurrentThreadId());
 * });
 * ```
 */
declare function releaseFromJs(tid): void;
/**
 * Remove a breakpoint on address_or_class
 * @return a boolean indicating if removal was successful
 */
declare function removeBreakpoint(address_or_class: any): boolean;
/**
 * Remove a java class initialization breakpoint on moduleName
 * ```javascript
 * removeJavaClassInitializationBreakpoint('android.app.Activity');
 * ```
 */
declare function removeJavaClassInitializationBreakpoint(moduleName: string): boolean;
/**
 * Remove a module initialization breakpoint on moduleName
 * ```javascript
 * removeModuleInitializationBreakpoint('mytarget.so');
 * ```
 */
declare function removeModuleInitializationBreakpoint(moduleName: string): boolean;
/**
 * Remove a watchpoint on the given address
 * ```javascript
 * removeWatchpoint(0x1234);
 * ```
 */
declare function removeWatchpoint(address: any): boolean;
/**
 * Restart the application
 * Android only
 * ```javascript
 * restart();
 * ```
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
 * ```javascript
 * startJavaTracer(['android.app.Activity', 'android.view.View'], function() {
 *     console.log(this.$className, this.method);
 * });
 * ```
 */
declare function startJavaTracer(classes: string[], callback: Function | object);
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
 * startNativeTracer({
 *      onInstruction: function () {
 *          console.log('onInstruction:', this.instruction.toString());
 *      },
 *      onCall: function () {
 *          console.log('call:', this.instruction.toString());
 *      },
 *      onReturn: function () {
 *          console.log('onReturn:', this.instruction.toString());
 *      },
 *      onJump: function () {
 *          console.log('onJump:', this.instruction.toString());
 *          console.log(JSON.stringify(this.context));
 *          if (this.context.pc.toInt32() === 0xdeadbeef) {
 *              this.stop();
 *          }
 *      },
 *      onPrivilege: function () {
 *          console.log('privilege call:', this.instruction.toString());
 *      }
 * })
 * ```
 */
declare function startNativeTracer(callback: Function | NativeTracerCallbacks);
/**
 * Stop the java tracer
 * ```javascript
 * stopJavaTracer();
 * ```
 */
declare function stopJavaTracer(): boolean;
/**
 * start syscall tracing
 * strace(function() {
 *     console.log(this.context.x0);
 *     if (1 === 1) {
 *         this.stop();
 *     }
 * });
 */
declare function strace(callback): boolean;
/**
 * Write the given hex string or ArrayBuffer into the given address
 * ```javascript
 * writeBytes(0x1234, 'aabbccddeeff');
 * ```
 */
declare function writeBytes(address: any, what: string | ArrayBuffer);