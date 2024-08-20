        class UIDraw extends Draw{

            static headers = [];

            constructor(objname){
                super(objname);
                var local = this;

                this.bError = false;

                this.uidrawdata = {};
            }

            Config(data){
                let config = this.ParseConfig(data);
                if(typeof config != 'undefined'){
                    if(typeof config.hide != 'undefined'){
                        if(config.hide){
                            this.Hide();
                        }
                    }
                }
            }

            // This funciton allows us to fix a header into a fixed location taking into account the other
            // fixed (header) content that might also exist.
            static SetupHeader(obj, header_ext){
                let height = obj.GetElemByExtension(header_ext).height();
                console.log('Setting header height('+header_ext+'):', height);
                UIDraw.SetHeaderData(height+'px', obj.GetElemIdNameByExtension(header_ext));
            }
            static GetHeaderHeight(){
                return UIDraw.GetHeaderPosition();
            }

            static SetHeaderData(height, id){
                let output = this.GetHeaderPosition();

                // Insert height and id only if this is it isn't already in the headers array
                let bFound = false;
                for(let i=0; i<UIDraw.headers.length; i++){
                    if(UIDraw.headers[i].id == id){
                        bFound = true;
                        break;
                    }
                }
                if(!bFound){
                    // push an array on the headers array
                    UIDraw.headers.push({id:id, height:height});
                }

                return output;
            }

            static GetHeaderPosition(){
                // Sum header positions where height includes px, ex: '40px'
                let pos = 0;
                for (let i = 0; i < UIDraw.headers.length; i++) {
                    // Ensure the height property exists and is not null or undefined
                    if (UIDraw.headers[i].height) {
                        // The parseInt function automatically disregards any non-numeric characters after the number
                        let heightValue = parseInt(UIDraw.headers[i].height);
            
                        // Check if the conversion to integer was successful (not NaN)
                        if (!isNaN(heightValue)) {
                            pos += heightValue;
                        } else {
                            console.error("Invalid height value encountered:", UIDraw.headers[i].height);
                        }
                    } else {
                        console.warn("Missing height for header at index:", i);
                    }
                }
                return pos;
            }

            Get(){
                return '';
            }

            SetInfo(info){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_container';
                if(typeof elem != 'undefined'){
                    $(elem).attr('data-info', btoa(info));
                }
            }

            GetInfo(){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_container';
                let val = $(elem).attr('data-info');
                if(typeof val != 'undefined' && val != ''){
                    return atob(val);
                }
                return '';
            }

            SetData(key, val){
                this.uidrawdata[key] = val;
            }

            GetData(key){
                if(typeof this.uidrawdata[key] != 'undefined'){
                    return this.uidrawdata[key];
                }
                return null;
            }

            SetLocalData(key, val){
                window.localStorage.setItem(key, val);
            }

            GetLocalData(key){
                return window.localStorage.getItem(key);
            }

            DeleteLocalData(key){
                window.localStorage.removeItem(key);
            }

            GetElemIdNameByExtension(ext){
                return this.prefix+'_'+this.GetClassNameLower()+'_'+ext;
            }

            GetElemByExtension(ext){
                let elem = '#'+this.GetElemIdNameByExtension(ext);
                return $(elem);
            }

            SetContent(html){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_content';
                $(elem).html(html);
            }

            GetContent(){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_content';
                return $(elem);
            }

            GetContainerId(){
                return this.prefix+'_'+this.GetClassNameLower()+'_container';
            }

            GetContainer(){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_container';
                return $(elem);
            }

            AppendContent(html){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_content';
                $(elem).append(html);
            }

            AppendContainer(html){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_container';
                $(elem).append(html);
            }

            PrependContent(html){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_content';
                $(elem).prepend(html);
            }

            PrependContainer(html){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_container';
                $(elem).prepend(html);
            }

            HideContent(){
                let id = this.prefix+'_'+this.GetClassNameLower()+'_content';
                $('#'+id).hide();
            }

            ShowContent(){
                let id = this.prefix+'_'+this.GetClassNameLower()+'_content';
                $('#'+id).show();
            }

            ContentIsVisible(){
                let id = this.prefix+'_'+this.GetClassNameLower()+'_content';
                return $('#'+id).is(':visible');
            }

            MakeInvisible(time, callback){
                var local = this;
                if(typeof time == 'undefined'){
                    let id = this.prefix+'_'+this.GetClassNameLower()+'_container';
                    $('#'+id).css('opacity', 0);
                }else{
                    this.GetElemByExtension('container').animate({opacity: 0}, time, function(){
                        local.GetElemByExtension('container').hide();
                        if(typeof callback != 'undefined'){
                            callback();
                        }
                    });
                }
            }

            MakeVisible(time, callback){
                var local = this;
                if(typeof time == 'undefined'){
                    let id = this.prefix+'_'+this.GetClassNameLower()+'_container';
                    $('#'+id).css('opacity', 1);
                }else{
                    this.GetElemByExtension('container').show();
                    this.GetElemByExtension('container').animate({opacity: 1}, time, function(){
                        if(typeof callback != 'undefined'){
                            callback();
                        }
                    });
                }
            }

            Blur(){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_container';
                $(elem).blur();
            }

            Hide(){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_container';
                $(elem).hide(0);
            }

            Show(){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_container';
                $(elem).show(0);
            }

            SlideUp(){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_container';
                $(elem).slideUp();
            }

            SlideDown(){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_container';
                $(elem).slideDown();
            }

            Remove(){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_container';
                $(elem).remove();
            }

            Disable(){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_container';
                $(elem).addClass('uidraw_disabled');
            }

            Enable(){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_container';
                $(elem).removeClass('uidraw_disabled');
            }

            IsVisible(){
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_container';
                return $(elem).is(':visible');
            }

            FadeIn(ms){
                if(typeof ms == 'undefined'){
                    ms = 200;
                }
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_container';
                $(elem).fadeIn(ms);
            }

            FadeOut(ms){
                if(typeof ms == 'undefined'){
                    ms = 200;
                }
                let elem = '#'+this.prefix+'_'+this.GetClassNameLower()+'_container';
                $(elem).fadeOut(ms);
            }

            HasError(){
                return this.bError;
            }

            MDLUpdate(callback){
                UIDrawUpdateMDL(callback);
            }

            SetPrefix(prefix){
                this.prefix = prefix;
            }

            GetPrefix(){
                return this.prefix;
            }

            static DrawIcon(icon, color){
                if(icon.startsWith('fa-')){
                    return `<i style='color:`+color+`;font-size: 20px;' class="fontawesome-sharp-thin `+icon+`"></i>`;
                }else{
                    return `<i style='color:`+color+`' class="material-icons">`+icon+`</i>`;
                }
            }            

            static StartButtonActivityIndicator(id){
                // Start activity indicator
                $('#'+id+' i').css('display', 'none');
                $('#'+id+' svg').css('display', 'flex');
            }

            static StopButtonActivityIndicator(id){
                // Stop activity indicator
                $('#'+id+' svg').css('display', 'none');
                $('#'+id+' i').css('display', 'inline-block');
            }

            static DrawIconButton(id, func, icon, color, tooltip){
                if(typeof color == 'undefined'){
                    color = '#000000aa';
                }
                var click = '';
                if(func != '' && func != null){
                    click = `onclick="`+func+`"`;
                }

                if(typeof tooltip != 'undefined'){
                     tooltip = `<div style="text-transform: none;" class="mdl-tooltip" data-mdl-for="${id}">${tooltip}</div>`;
                }else{
                    tooltip = '';
                }

                let iconHtml = UIDraw.DrawIcon(icon, color);

                var html =`<button id="`+id+`" class="mdl-button mdl-js-button mdl-button--icon" `+click+`>
                    ${iconHtml}
                    ${tooltip}
                    <svg style="fill:gray;display:none;background: none;width:20px;height:20px;margin: 6px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-dual-ring"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.stroke}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" stroke-linecap="round" r="40" stroke-width="4" stroke="gray" stroke-dasharray="62.83185307179586 62.83185307179586" transform="rotate(34.6018 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>
                </button>`;
                return html;
            }

            GetStartHTML() {
                //var html = super.GetStartHTML();
                var prefix = this.GetPrefix();
                var obj    = this.GetObjectName();
                var name   = this.GetClassNameLower();

                return '';
            }
        } // class UIDraw