<template>
    <section class="contact">
        <h1>{{ $t('card.title4') }}</h1>
        <div class="icon">
            <Contact></Contact>
        </div>
        <div class="float"></div>
        <p>
            <span class="info">
                <em>{{ $t('navbar.title') }}</em> {{ $t('contact.info') }}
            </span>
            <span class="email">
                {{ $t('contact.email') }}
                <a href="mailto:uestc_zeqistudio@163.com">uestc_zeqistudio@163.com</a>
                {{ $t('contact.dot') }}
            </span>
        </p>
    </section>
</template>

<script setup>
import Contact from '@/icons/Contact.vue';
</script>

<style scoped lang="scss">
.contact {
    position: relative;
    height: 360px;
    padding: 10px 40px;
    max-width: 800px;
    width: 80%;
    margin: auto;
    background-color: #fff6;
    border-radius: 8px;

    &:hover {
        transition: box-shadow .1s;
        box-shadow: 0 10px 20px 0px #0003;
    }

    h1 {
        margin-bottom: 0;
    }

    p {
        font-size: 16px;
        line-height: 1.8;

        em {
            font-style: normal;
            font-family: "Paytone One", "PingFangSC", sans-serif;
            font-weight: 200;
            background: linear-gradient(45deg, #ff829d, #004cff);
            background-clip: text;
            color: transparent;
        }

        a {
            word-break: break-word;
            color: #004cff;
            text-decoration: none;
        }

        @media screen and (max-width: 768px) {

            .info {
                display: none;
            }
        }
    }

    .icon {
        position: absolute;
        height: 360px;
        width: 360px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        right: -10%;
        bottom: 0px;
        transform: translate(0%, 25%);

        svg {
            height: 360px;
            width: 360px;
        }
    }

    .float {
        float: right;
        height: 240px;
        width: 240px;
        margin-top: 300px;
        border-radius: 50%;
        shape-outside: circle(34% at 50% 37%);
    }
}
</style>