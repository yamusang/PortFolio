import java.util.Arrays;

public class NumberGame {
    public static void main(String[] args) {
        int ainums = (int) (Math.random() * 50);
        int[] gnums = new int[5];
        boolean a = true;
        do {
            GameValue gv = new GameValue();
            System.out.println("[[[[[숫자게임을 시작합니다.]]]]]");
            System.out.println("- AI는 숫자를 결정했습니다. -");
            System.out.println(" - 너 휴먼은 맞춰보세요.(숫자는 1부터 50 안에서 정하세요.) -");
            System.out.println("@@@ 시도 제한 횟수는 5입니다. @@@");
            String input = System.console().readLine("참가자 닉네임(종료:end) >>>>");
            gv.setGamer(input);
            switch (input) {
                case "end":
                    a = false;
                    System.out.println("::프로그램 종료::");
                    break;

                default:
                    int index = 0;
                    boolean b = true;
                    int count = 5;
                    while (b) {
                        
                            gnums[index] = Integer
                                    .parseInt(System.console().readLine("너 휴먼 생각한 숫자 입력(남은 기회 : %d) >>>", count));
                            count = count - 1;
                            gv.setDoin(1);

                            if (gnums[index] > ainums) {
                                System.out.println("아닙니다. 더 작은 값입니다.");
                            } else if (gnums[index] < ainums) {
                                System.out.println("아닙니다. 더 큰 값입니다.");
                            } else if (gnums[index] == ainums) {
                                System.out.println("딩동댕!! 정답입니다.");
                                gv.setIsOk(true);
                                System.out.printf("✔정답:%d 시도횟수:%d\n", ainums, gv.getDoin());
                                System.out.println("✔입력한 숫자 : " + Arrays.toString(gnums));
                                System.out.println("숫자 맞추기 성공!!");
                                b=false;
                            }

                            index++;
                            if (index == 5) {
                                b = false;
                            }

                        if (gnums[index-1] != ainums && count == 0) {
                            System.out.printf("✔정답:%d 시도횟수:%d\n", ainums, gv.getDoin());
                            System.out.println("✔입력한 숫자 : " + Arrays.toString(gnums));
                            System.out.println("실패!! 주어진 기회를 다 쓰셨습니다. 게임을 다시 시작하세요.!!");
                            b = false;

                        }
                    }
                       

                    
                    System.out.println("GameValue 객체 확인");
                    System.out
                            .println("gamer : " + gv.getGamer() + ", 시도횟수 : " + gv.getDoin() + ", 성공여부 : " + gv.getIsOk());
                    if (index > 4)
                        index = 0;
                    break;
            }
        } while (a);
    }
}

class GameValue {
    private String gamer;
    private int doin;
    private boolean isOk;

    public String getGamer() {
        return gamer;
    }

    public void setGamer(String gamer) {
        this.gamer = gamer;
    }

    public int getDoin() {
        return doin;
    }

    public void setDoin(int doin) {

        this.doin += doin;

    }

    public boolean getIsOk() {
        return isOk;
    }

    public void setIsOk(boolean isOk) {
        this.isOk = isOk;
    }
}