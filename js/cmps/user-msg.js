import { eventBus } from "../services/event-bus-service.js";

export default {
    template: `
    <section v-if="msg" class="user-msg" :class="msg.type">
       <button class="close-user-msg icon" @click="closeMsg">X</button>
            <p>{{msg.txt}}</p>
        </section>
    `,
    data() {
        return {
            msg: null,
            setTimeOutId: null
        }
    },
    created() {
        eventBus.$on('show-msg', this.showMsg);
    },
    destroyed() {
        eventBus.$off('show-msg', this.showMsg);
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            this.setTimeOutId = setTimeout(() => {
                this.msg = null;
            }, 2500);
        },
        closeMsg() {
            this.msg = null;
            clearTimeout(this.setTimeOutId);
        }
    }
}