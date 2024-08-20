		window.onload = function(){
			var el = $(".draw_draggable");
			if(typeof el.draggable !== 'undefined'){
				el.draggable();
			}
		}

		var uiDrawTimeout;
		var mdl_callbacks = [];
		function UIDrawUpdateMDL(callback) {
			mdl_callbacks.push(callback);
			clearTimeout(uiDrawTimeout);
			uiDrawTimeout = setTimeout(function() {
				if(typeof componentHandler !== 'undefined'){
					componentHandler.upgradeAllRegistered();

					jQuery.each( mdl_callbacks, function( i, val ) {
						if(mdl_callbacks[i] != null && typeof mdl_callbacks[i] != 'undefined'){
							mdl_callbacks[i]();
						}
					});
					mdl_callbacks = []; // Clear
				}
			}, 150);
		}

		class Draw{
			static #baseurl  = '';
			static #basepath = '';

			static SetBaseURL(baseurl){
				Draw.baseurl = baseurl;
			}

			static GetBaseURL(){
				return Draw.baseurl;
			}

			static SetBasePath(basepath){
				Draw.basepath = basepath;
			}

			static GetBasePath(){
				return Draw.basepath;
			}

			static SetOs(os){
				Draw.os = os;
			}

			static GetOs(){
				return Draw.os;
			}

			constructor(objname){
				var local = this;
				this.debug = false;

				if(typeof objname !== 'undefined'){
					this.objname = objname;
					this.prefix  = this.objname.replace(/\./g, '_');
					this.prefix  = this.prefix.replace(/\',\'/g, '__');
					this.prefix  = this.prefix.replace(/\'/g, '');
					this.prefix  = this.prefix.replace(/\(/g, '_');
					this.prefix  = this.prefix.replace(/\)/g, '_');
					this.prefix  = this.prefix.replace(/\[/g, '_');
					this.prefix  = this.prefix.replace(/\]/g, '_');
					this.prefix  = this.prefix.replace(/\,/g, '_');
					this.prefix  = this.prefix.replace('GetObject', 'objs');
					this.prefix  = this.prefix.replace('window_', '');
				}else{
					console.log("Invalid objname specified");
				}
			}

			ParseConfig(data){
				if(data.charAt(0) != '{' && data.charAt(0) != '['){
					data = atob(data);
				}
				return JSON.parse(data);
			}

			SetDebug(val){
				this.debug = val;
			}

			GetClassName(){
				return this.constructor.name;
			}

			GetClassNameLower(){
				return this.constructor.name.toLowerCase();
			}

			GetObjectName(){
				return this.objname;
			}

			GetPrefix(){
				return this.prefix;
			}

			LoadScriptWithPromise(src) {
				return new Promise(resolve => {
					const script = document.createElement("script");
					script.setAttribute("async", "");
					script.onload = resolve;
					script.setAttribute("src", src);
					document.head.appendChild(script);
				});
			}

			RequireEPFormat(baseurl, name, callback){
				if(typeof callback != 'undefined'){
					let urls = [
						baseurl+'common/EPFormat/js/EPFormat.js',
						baseurl+'common/EPFormat/js/'+name+'.js'
					];
					Promise.all(urls.map(this.LoadScriptWithPromise)).then(callback);
				}else{
					this.RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
					this.RequireOnce(baseurl+'common/EPFormat/js/'+name+'.js');
				}
			}

			LoadScript(url, callback) {
				var script = document.createElement('script');
				script.src = url;

				// Check if the script is already loaded
				var scripts = document.getElementsByTagName('script');
				var scriptExists = Array.from(scripts).some(function(existingScript) {
				  	return existingScript.src === script.src;
				});

				if (scriptExists) {
				  	// Script is already loaded, execute the callback immediately
				  	if (typeof callback === 'function') {
						callback();
				  	}
				} else {
				  	// Script is not loaded, proceed with loading
				  	if (typeof callback === 'function') {
						// Execute the callback function when the script is loaded
						script.onload = callback;
				  	}
				  	// Append the script to the document
				  	document.head.appendChild(script);
				}
			}

			RequireOnce(url, callback) {
				var local = this;
				if(typeof callback != 'undefined'){
					local.LoadScript(url, callback);
				}else{
					if (!$("script[src='" + url + "']").length) {
						let str = 'script';
						let tmp = "<"+str+" type='text/javascript' src='" + url + "'/>";
						$('head').append(tmp);
					}
				}
			}

			GetAdapter(){
				return this.constructor.name+':'+this.objname;
			}

			RequireOnceCss(url) {
				if (!$("link[href='" + url + "']").length) {
					let tmp = "<link rel='stylesheet' href='" + url + "' type='text/css' media='screen'/>";
					$('head').append(tmp);
				}
			}

			MDLUpdate(callback){
				UIDrawUpdateMDL(callback);
			}

			log(str){
				if(this.debug){
					console.log(str);
				}
			}
		} //class