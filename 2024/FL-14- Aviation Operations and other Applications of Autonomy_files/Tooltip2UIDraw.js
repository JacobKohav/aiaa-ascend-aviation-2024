        // **************************************************
        // Tooltip2UIDraw - JS Class
        class Tooltip2UIDraw extends UIDraw{
            constructor(obj){
                super(obj);

                this.callback = null;

                this.alignment   = 'center';
                this.optionClass = '';
                this.targetID    = '';
                this.msg         = '';
            }

            Setup(callback){
                var local = this;

                this.callback = callback;
            }

            SetMsg(msg){
                this.msg = msg;
                let elem = $('#'+this.prefix+'_tooltip2uidraw_container');
                if(typeof elem != 'undefined'){
                    elem.text(msg);
                    this.MDLUpdate();
                }
            }

            SetTargetId(targetID){
                this.targetID = targetID;
                let elem = $('#'+this.prefix+'_tooltip2uidraw_container');
                if(typeof elem != 'undefined'){
                    elem.attr('data-mdl-for', targetID);
                    this.MDLUpdate();
                }
            }

            SetAlignment(alignment){
                this.alignment = alignment;
            }

            SetTooltipPosition(position) {
                switch (position) {
                    case "large":
                    this.optionClass = "mdl-tooltip--large";
                    break;
                    case "top":
                    this.optionClass = "mdl-tooltip--top";
                    break;
                    case "bottom":
                    this.optionClass = "mdl-tooltip--bottom";
                    break;
                    case "right":
                    this.optionClass = "mdl-tooltip--right";
                    break;
                    case "left":
                    this.optionClass = "mdl-tooltip--left";
                    break;
                }//switch
                let elem = $('#'+this.prefix+'_tooltipuidraw');
                if(typeof elem != 'undefined'){
                    // Add a class to javascript
                    elem.removeClass('mdl-tooltip--large mdl-tooltip--top mdl-tooltip--bottom mdl-tooltip--right mdl-tooltip--left');
                    elem.addClass(this.optionClass);
                }
            }

            GetStartHTML(){
                const html = `
                <div id="${this.prefix}_tooltip2uidraw_container" class="tooltip2uidraw_container mdl-tooltip" style="${this.alignment}" data-mdl-for="${this.targetID}">
                    ${this.msg}
                </div>
                `;
                return html;
            }
        }